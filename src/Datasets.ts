import { trace } from "@opentelemetry/api";
import { constructEnvironmentLink, HnyTricksAuthorization } from "./common";
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

  const now = new Date();
  const daysSince = (date: Date) => {
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  const environmentUrl = constructEnvironmentLink(auth);
  const datasetRows = datasets.map((d) =>
    datasetRow(environmentUrl, daysSince, d)
  );
  const col1 = new DatasetName(datasets.length, auth.environment.name);
  return html`<table class="dataset-table">
    <thead>
      <tr>
        ${col1.header()}
        <th scope="col">Settings</th>
        <th scope="col">Query</th>
        <th scope="col">Days Since Last Data</th>
        <th scope="col">Delete?</th>
      </tr>
    </thead>
    ${datasetRows}
    <tfoot>
      <tr>
        ${col1.footer()}
        <td>
          <a
            href="${environmentUrl + "overview"}"
            target="_blank"
            class="link-symbol"
          >
            ⛭
          </a>
        </td>
        <td>
          <a
            href="${environmentUrl + CountQueryUrlParams}"
            target="_blank"
            class="link-symbol"
            >📈</a
          >
        </td>
        <td>
          ${"" + Math.min(...datasets.map((d) => daysSince(d.last_written)))}
        </td>
        <td>Delete Old Dataset</td>
      </tr>
    </tfoot>
  </table>`;
}

function datasetRow(
  environmentUrl: string,
  daysSince: (t: Date) => number,
  d: HnyTricksDataset
) {
  const datasetUrl = environmentUrl + "datasets/" + d.slug;
  const linkToSettings = datasetUrl + "/overview";
  const linkToCountQuery = datasetUrl + CountQueryUrlParams;
  const daysSinceLastWritten = daysSince(d.last_written);
  const checkbox =
    daysSinceLastWritten > ASSUMED_RETENTION_TIME
      ? html`<input class="delete-dataset-checkbox" type="checkbox" checked />`
      : html`<input
          class="delete-dataset-checkbox"
          type="checkbox"
          disabled
        />`; // don't delete datasets with data in them
  return html`<tr>
    ${new DatasetName(undefined, undefined).row(d)}
    <td>
      <a href="${linkToSettings}" target="_blank" class="link-symbol">⛭</a>
    </td>
    <td>
      <a href="${linkToCountQuery}" target="_blank" class="link-symbol">📉</a>
    </td>
    <td>${"" + daysSinceLastWritten}</td>
    <td>${checkbox}</td>
  </tr>`;
}

type Html = string;
interface Column {
  header(): Html;
  row(d: HnyTricksDataset): Html;
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
    return html`<th scope="row" class="dataset-name-col">${d.name}</td>`;
  }
  footer(): Html {
    return html`<td>
      ${this.countOfDatasets} datasets in ${this.environmentName}
    </td>`;
  }
}
