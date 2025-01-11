import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { Html, html } from "../htm-but-right";
import { inSpanAsync } from "../tracing-util";
import { Column, DatasetSlug, HnyTricksDataset } from "./dataset_common";
import { StatusUpdate } from "../status";

const ASSUMED_RETENTION_TIME = 60; // days

export class DaysSinceLastWritten implements Column {
  private minDaysSinceLastWrite: number;
  private now = new Date();
  private daysSince(date: Date) {
    return Math.floor(
      (this.now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  constructor(allLastWrittenDates: Date[]) {
    this.minDaysSinceLastWrite = Math.min(
      ...allLastWrittenDates.map((a) => this.daysSince(a))
    );
  }

  header(): Html {
    return html`<th scope="col">Days Since Last Data</th>`;
  }
  row(d: HnyTricksDataset): Html {
    return html`<td>${"" + this.daysSince(d.last_written)}</td>`;
  }
  footer(): Html {
    return html`<td>${"" + this.minDaysSinceLastWrite}</td>`;
  }
}

export class DeleteMe implements Column {
  private now = new Date();
  private daysSince(date: Date) {
    return Math.floor(
      (this.now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  constructor() {}

  header(): Html {
    return html`<th scope="col">Delete?</th>`;
  }
  row(d: HnyTricksDataset, i: number): Html {
    const slug = html`<input
      name="dataset-slug-${i}"
      value="${d.slug}"
      type="hidden"
    />`;
    const checkbox =
      this.daysSince(d.last_written) > ASSUMED_RETENTION_TIME
        ? html`<input
            class="delete-dataset-checkbox"
            type="checkbox"
            name="delete-dataset-${i}"
            checked
          />`
        : html`<input
            class="delete-dataset-checkbox"
            type="checkbox"
            title="I only delete empty datasets"
            disabled
          />`; // don't delete datasets with data in them
    return html`<td>${slug}${checkbox}</td>`;
  }
  footer(): Html {
    return html`<td>
      <button
        hx-post="/datasets/delete"
        hx-target="#dataset-section"
        hx-include="#auth_data"
      >
        Delete Old Datasets
      </button>
    </td>`;
  }
}

/**
 * for indexes i...
 * {
 * delete-dataset-${i} : "on" // or else it's absent
 * dataset-slug-${i}: string
 * }
 */
export type DeleteDatasetInputs = Record<string, string>;
export async function deleteDatasets(
  auth: HnyTricksAuthorization,
  inputs: DeleteDatasetInputs
): Promise<StatusUpdate> {
  const span = trace.getActiveSpan();
  span?.setAttributes({ "app.datasets.delete.input": JSON.stringify(inputs) });
  const datasetSlugs = datasetSlugsToDelete(inputs);

  const results = await Promise.all(
    datasetSlugs.map((slug) =>
      inSpanAsync("delete dataset " + slug, () =>
        enableDatasetDeletion(auth, slug).then((status) =>
          deleteDataset(auth, status)
        )
      )
    )
  );

  const success = results.every((r) => r.deleted);

  const status =
    results.length === 0
      ? html`Zero datasets deleted`
      : results.map((r) => {
          if (r.deleted === true) {
            return html`<p class="success-result">${r.slug} deleted 🙂</p>`;
          }
          return html`<p class="failure-result">
            ${r.slug} not deleted: ${r.error} 😭
          </p>`;
        });

  return { success, html: status };
}

async function enableDatasetDeletion(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug
): Promise<DatasetDeletionStatus> {
  // the [docs](https://api-docs.honeycomb.io/api/datasets/updatedataset) for this say that I should
  // send all fields or else they'll be wiped out (like the description) but wth we're deleting it anyway
  const newDatasetSettings = {
    settings: {
      delete_protected: false,
    },
  };
  const result = await fetchFromHoneycombApi(
    {
      apiKey: auth.apiKey,
      method: "PUT",
      keyInfo: auth.keyInfo,
      body: newDatasetSettings,
      whatToExpectBack: "nothing",
    },
    "datasets/" + slug
  );
  if (isFetchError(result)) {
    return {
      slug,
      deletionEnabled: false,
      deleted: false,
      error: result.message,
    };
  }
  return { slug, deletionEnabled: true, deleted: false };
}

type DatasetDeletionStatus = {
  slug: DatasetSlug;
  deleted: boolean;
  deletionEnabled: boolean;
  error?: string;
};

async function deleteDataset(
  auth: HnyTricksAuthorization,
  status: DatasetDeletionStatus
): Promise<DatasetDeletionStatus> {
  const { slug } = status;
  if (!status.deletionEnabled) {
    return status;
  }

  const result = await fetchFromHoneycombApi(
    {
      apiKey: auth.apiKey,
      method: "DELETE",
      keyInfo: auth.keyInfo,
      whatToExpectBack: "nothing",
    },
    "datasets/" + slug
  );
  if (isFetchError(result)) {
    return { ...status, deleted: false, error: result.message };
  }
  return { ...status, deleted: true };
}

// exported for testing
export function datasetSlugsToDelete(
  inputs: DeleteDatasetInputs
): DatasetSlug[] {
  const datasetSlugs = Object.keys(inputs)
    .filter((k) => k.startsWith("delete-dataset-"))
    .map((k) => k.split("-"))
    .map((parts) => parts[2]) // get just the number
    .map((i) => inputs[`dataset-slug-${i}`]); // get the slug for that number
  return datasetSlugs;
}
