import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import {
  FetchError,
  fetchFromHoneycombApi,
  isFetchError,
} from "../HoneycombApi";
import { html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";
import { DatasetSlug, HnyTricksDataset, Html } from "./dataset_common";
import { DatasetsTable } from "./DatasetsTable";

export async function describeDatasets(
  auth: HnyTricksAuthorization,
  status?: Html
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
    ${status}
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
type HnyApiDataset = {
  name: string;
  description: string;
  slug: DatasetSlug;
  created_at: DateTimeString;
  last_written_at: DateTimeString;
  regular_columns_count: number;
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
