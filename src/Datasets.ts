import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "./common";
import {
  FetchError,
  fetchFromHoneycombApi,
  isFetchError,
} from "./HoneycombApi";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

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
    <${DatasetsTable} datasets=${datasets} />
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

type HnyTricksDataset = {
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

function DatasetsTable(params: { datasets: HnyTricksDataset[] }) {
  const { datasets } = params;
  const now = new Date();
  const daysSince = (date: Date) => {
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  const datasetRows = datasets.map((d) => {
    return html`<tr>
      <th scope="row" class="dataset-name-col">${d.name}</th>
      <td>${daysSince(d.last_written)}</td>
      <td><input class="delete-dataset-checkbox" type="checkbox"></input></td>
    </tr>`;
  });
  return html`<table class="dataset-table">
    <thead>
      <tr>
        <th scope="col" class="dataset-name-col">Dataset</th>
        <th scope="col">Days Since Last Data</th>
        <th scope="col">Delete?</th>
      </tr>
    </thead>
    ${datasetRows}
  </table>`;
}
