import { HnyTricksAuthorization, constructEnvironmentLink } from "../common";
import { html } from "../htm-but-right";
import { Column, HnyTricksDataset, Html } from "./dataset_common";
import { DaysSinceLastWritten, DeleteMe } from "./deletion";
import { DerivedColumnForDatasetName } from "./derivedColumns";

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
    new DerivedColumnForDatasetName(),
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

class DatasetName implements Column {
  constructor(
    private countOfDatasets: number,
    private environmentName: string
  ) {}
  header(): Html {
    return html`<th scope="col" class="dataset-name-col">Dataset</th>`;
  }
  row(d: HnyTricksDataset, i: number): Html {
    return html`<th scope="row" class="dataset-name-col">${
      d.name
    }<input type="hidden" name="dataset_name_${i}" value="${encodeURIComponent(
      d.name
    )}"/></td>`; // TODO: closing tag is wrong
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
