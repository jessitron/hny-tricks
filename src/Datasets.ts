import { trace } from "@opentelemetry/api";
import { constructEnvironmentLink, HnyTricksAuthorization } from "./common";
import {
  FetchError,
  fetchFromHoneycombApi,
  isFetchError,
} from "./HoneycombApi";
import { html } from "./htm-but-right";
import { currentTraceId, inSpanAsync } from "./tracing-util";
import { env } from "process";

export async function describeDatasets(
  auth: HnyTricksAuthorization
): Promise<string> {
  const span = trace.getActiveSpan();
  span?.setAttribute(
    "app.datasets.canManageDatasets",
    auth.permissions.canManageDatasets
  );
  if (!auth.permissions.canManageDatasets) {
    return html`<span data-traceId="${currentTraceId()}">
      This API Key does not have the "Manage Datasets" permission.
    </span>`;
  }

  const datasets = await retrieveDatasets(auth);

  if (isFetchError(datasets)) {
    return displayError("Unable to fetch datasets", datasets);
  }
  span?.setAttributes({
    "app.datasets.count": datasets.length,
  });

  return html`<div data-traceId="${currentTraceId()}">
    <${DatasetsTable} datasets=${datasets} auth=${auth} />
  </div>`;
}

function displayError(msg: string, fetchError: FetchError) {
  const hover = `${msg}: ${fetchError.message}`;
  return html`<span data-traceId="${currentTraceId()}" title="${hover}">
    😵
  </span>`;
}

/**
 * 
  {
    "name": "my dataset!",
    "description": "my dataset described!",
    "slug": "my-dataset-",
    "expand_json_depth": 2,
    "created_at": "2022-07-21T18:39:23Z",
    "last_written_at": "2022-07-22T19:52:00Z",
    "regular_columns_count": 12
  },
 */
type DateTimeString = string; // ISO 8601 format, Zulu time
type DatasetSlug = string;
type HnyApiDataset = {
  name: string;
  description: string;
  slug: DatasetSlug;
  created_at: DateTimeString;
  last_written_at: DateTimeString;
  regular_columns_count: number;
};

// exported for testing
export type HnyTricksDataset = {
  name: string;
  slug: DatasetSlug;
  created: Date;
  last_written: Date;
};

async function retrieveDatasets(
  auth: HnyTricksAuthorization
): Promise<HnyTricksDataset[] | FetchError> {
  const result: HnyApiDataset[] | FetchError = await fetchFromHoneycombApi(
    auth,
    "/datasets"
  );
  if (isFetchError(result)) {
    return result;
  }
  return result.map((d) => ({
    name: d.name,
    slug: d.slug,
    created: new Date(d.created_at),
    last_written: new Date(d.last_written_at),
  }));
}

const ASSUMED_RETENTION_TIME = 60; // days

const COUNT_QUERY = {
  time_range: 5184000, // last 60 days
  granularity: 0,
  calculations: [
    {
      op: "COUNT",
    },
  ],
  filter_combination: "AND",
  limit: 1000,
};

const CountQueryUrlParams =
  "?query=" + encodeURIComponent(JSON.stringify(COUNT_QUERY));

export function DatasetsTable(params: {
  datasets: HnyTricksDataset[];
  auth: HnyTricksAuthorization;
}) {
  const { datasets, auth } = params;

  const environmentUrl = constructEnvironmentLink(auth);
  const columns = [
    new DatasetName(datasets.length, auth.environment.name),
    new LinkToSettings(environmentUrl),
    new LinkToQuery(environmentUrl),
    new DaysSinceLastWritten(datasets.map((d) => d.last_written)),
    new DeleteMe(),
  ];
  return html`<form id="dataset-table-form">
    <table class="dataset-table">
      <thead>
        <tr>
          ${columns.map((c) => c.header())}
        </tr>
      </thead>
      ${datasets.map(
        (d, i) =>
          html`<tr>
            ${columns.map((c) => c.row(d, i))}
          </tr>`
      )}
      <tfoot>
        <tr>
          ${columns.map((c) => c.footer())}
        </tr>
      </tfoot>
    </table>
  </form>`;
}

type Html = string;
interface Column {
  header(): Html;
  row(d: HnyTricksDataset, i: number): Html;
  footer(): Html;
}

class DatasetName implements Column {
  constructor(
    private countOfDatasets: number,
    private environmentName: string
  ) {}
  header(): Html {
    return html`<th scope="col" class="dataset-name-col">Dataset</th>`;
  }
  row(d: HnyTricksDataset): Html {
    return html`<th scope="row" class="dataset-name-col">${d.name}</td>`; // TODO: closing tag is wrong
  }
  footer(): Html {
    return html`<td>
      ${this.countOfDatasets} datasets in ${this.environmentName}
    </td>`;
  }
}

class LinkToSettings implements Column {
  constructor(private environmentUrl: string) {}
  header(): Html {
    return html`<th scope="col">Settings</th>`;
  }
  row(d: HnyTricksDataset): Html {
    const datasetUrl = this.environmentUrl + "datasets/" + d.slug;
    const linkToSettings = datasetUrl + "/overview";
    return html`<td>
      <a href="${linkToSettings}" target="_blank" class="link-symbol">⛭</a>
    </td>`;
  }
  footer(): Html {
    const environmentSettingsUrl = this.environmentUrl + "overview";
    return html`<td>
      <a href="${environmentSettingsUrl}" target="_blank" class="link-symbol">
        ⛭
      </a>
    </td>`;
  }
}

class LinkToQuery implements Column {
  constructor(private environmentUrl: string) {}
  header(): Html {
    return html`<th scope="col">Query</th>`;
  }
  row(d: HnyTricksDataset): Html {
    const datasetUrl = this.environmentUrl + "datasets/" + d.slug;
    const linkToCountQuery = datasetUrl + CountQueryUrlParams;
    return html`<td>
      <a href="${linkToCountQuery}" target="_blank" class="link-symbol">📉</a>
    </td>`;
  }
  footer(): Html {
    const environmentQueryUrl = this.environmentUrl + CountQueryUrlParams;
    return html`<td>
      <a href="${environmentQueryUrl}" target="_blank" class="link-symbol">
        📈
      </a>
    </td>`;
  }
}

class DaysSinceLastWritten implements Column {
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

class DeleteMe implements Column {
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
            disabled
          />`; // don't delete datasets with data in them
    return html`<td>${slug}${checkbox}</td>`;
  }
  footer(): Html {
    return html`<td>
      <button
        hx-post="/datasets/delete"
        hx-target="#dataset-section"
        hx-include="#auth_response"
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
) {
  const span = trace.getActiveSpan();
  span?.setAttributes({ "app.datasets.delete.input": JSON.stringify(inputs) });
  const datasetSlugs = datasetSlugsToDelete(inputs);

  await Promise.all(
    datasetSlugs.map((slug) =>
      inSpanAsync("delete dataset " + slug, () =>
        enableDatasetDeletion(auth, slug).then((_) => deleteDataset(auth, slug))
      )
    )
  );

  return html`<div traceId=${currentTraceId()}>
    delete datasets: ${datasetSlugs.join(", ")}, yeah haha
  </div>`;
}

async function enableDatasetDeletion(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug
) {}

async function deleteDataset(auth: HnyTricksAuthorization, slug: DatasetSlug) {
   

}

// exported for testing
export function datasetSlugsToDelete(inputs: DeleteDatasetInputs): any[] {
  const datasetSlugs = Object.keys(inputs)
    .filter((k) => k.startsWith("delete-dataset-"))
    .map((k) => k.split("-"))
    .map((parts) => parts[2]) // get just the number
    .map((i) => inputs[`dataset-slug-${i}`]); // get the slug for that number
  return datasetSlugs;
}
