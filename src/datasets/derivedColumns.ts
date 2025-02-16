import { trace } from "@opentelemetry/api";
import { constructEnvironmentLink, HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { Column, HnyTricksDataset } from "./dataset_common";
import { StatusUpdate } from "../status";

type DatasetSlug = string;
type DerivedColumnAlias = string;

const QueryForDcDataset = {
  time_range: 7200,
  granularity: 0,
  breakdowns: ["dc.dataset"],
  calculations: [
    {
      op: "COUNT",
    },
  ],
  orders: [
    {
      op: "COUNT",
      order: "descending",
    },
  ],
  havings: [],
  trace_joins: [],
  limit: 1000,
};

export class DerivedColumnForDatasetName implements Column {
  private hasPermissions: boolean;
  constructor(private auth: HnyTricksAuthorization) {
    this.hasPermissions = auth.permissions.canManageColumns;
  }

  header(): Html {
    return html`<th scope="col">dc.dataset</th>`;
  }
  row(d: HnyTricksDataset, i: number): Html {
    if (!this.hasPermissions) {
      return html`<td
        title="API key lacks 'Manage Queries and Columns' permission"
      >
        💂🏽‍♀️
      </td>`;
    }

    const url = `/datasets/dc/exists?slug=${
      d.slug
    }&alias=dc.dataset&row=${i}&datasetName=${encodeURIComponent(d.name)}`;
    return html`<td
      hx-trigger="intersect"
      hx-post=${url}
      hx-include="#auth_data"
    >
      💬
    </td>`;
  }
  footer(): Html {
    const queryUrl =
      constructEnvironmentLink(this.auth) +
      "?query=" +
      encodeURIComponent(JSON.stringify(QueryForDcDataset));
    const queryLink = html`<a href=${queryUrl} target="_blank"> 📈 </a>`;
    if (!this.hasPermissions) {
      // can't create, but they can have the query.
      return html`<td>${queryLink}</td>`;
    }
    // todo: I would like the query link to appear after we know there are any defined,
    // and the create button to appear after we know there are any not-defined.
    return html`<td>
      <button
        id="dc-dataset-create"
        hx-on:dc-dataset-create="this.hidden = false"
        hidden="true"
        hx-post="/datasets/dc/create-all?alias=dc.dataset"
        hx-target="#dataset-section"
        hx-include="#auth_data"
        title="make these derived columns"
      >
        Create</button
      ><a
        href=${queryUrl}
        target="_blank"
        hidden="true"
        hx-on:dc-dataset-query-event="this.hidden = false"
        id="dc-dataset-query"
      >
        📈
      </a>
    </td>`;
  }
}

type ListDerivedColumnResponse = {
  id: string;
  alis: string;
  expression: string;
  description: string;
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
};

type DerivedColumnExistsInput = {
  slug: DatasetSlug;
  datasetName: string;
  alias: string;
  row: string;
};

type HtmxResponse = {
  html: Html;
  hx_trigger?: string | Record<string, { target: string }>; // send the event, or send it with a target
};

export async function derivedColumnExists(
  auth: HnyTricksAuthorization,
  input: DerivedColumnExistsInput
): Promise<HtmxResponse> {
  const span = trace.getActiveSpan();
  const datasetName = decodeURIComponent(input.datasetName);
  const { slug, alias, row } = input;
  span.setAttributes({
    "app.derived_column.slug": slug,
    "app.derived_column.datasetName": datasetName,
    "app.derived_column.alias": alias,
  });

  const apiUrl = `derived_columns/${slug}?alias=${alias}`;
  const result = await fetchFromHoneycombApi<ListDerivedColumnResponse>(
    { apiKey: auth.apiKey, keyInfo: auth.keyInfo },
    apiUrl
  );
  if (isFetchError(result)) {
    if (result.statusCode === 404) {
      return {
        html: html`<span data-traceid=${currentTraceId()}
          ><input
            class="create-dc-checkbox"
            type="checkbox"
            checked
            name="create_${encodeURIComponent(alias)}_for_${row}"
            title="absent. create?"
        /></span>`,
        hx_trigger: { "dc-dataset-create": { target: "#dc-dataset-create" } },
      };
    } else {
      return {
        html: html`<span
          data-traceid=${currentTraceId()}
          title=${result.message}
          >😵</span
        >`,
      };
    }
  }

  const expectedExpression = derivedColumnFormula(alias, {
    datasetSlug: slug,
    datasetName,
  });
  span.setAttributes({
    "app.derived_column.expectedExpression": expectedExpression,
  });
  const observedExpression = result.expression;
  if (expectedExpression !== observedExpression) {
    return {
      html: html`<span
        title="expression looks wrong. Expected: ${expectedExpression} Observed: ${observedExpression}"
        data-traceid=${currentTraceId()}
      >
        😵‍💫
      </span>`,
    };
  }
  return {
    html: html`<span
      title="derived column exists"
      data-traceid=${currentTraceId()}
    >
      ☘️
    </span>`,
    hx_trigger: { "dc-dataset-query-event": { target: "#dc-dataset-query" } },
    // todo, turn on the query link
  };
}

/**
 * {
 * [create_${encodeURIComponent(alias)}_for_${i}]: "on"
 * }
 */
type CreateDerivedColumnsInput = Record<string, string>;
export async function createDerivedColumns(
  auth: HnyTricksAuthorization,
  alias: string,
  inputs: CreateDerivedColumnsInput
): Promise<StatusUpdate> {
  const input_prefix = `create_${encodeURIComponent(alias)}_for_`;

  const datasetRows = Object.keys(inputs)
    .filter((k) => k.startsWith(input_prefix))
    .map((k) => k.substring(input_prefix.length));

  const results = await Promise.all(
    datasetRows.map((i) =>
      createDerivedColumn(
        auth,
        inputs[`dataset-slug-${i}`],
        decodeURIComponent(inputs[`dataset_name_${i}`]),
        alias
      )
    )
  );

  const success = results.every((r) => r.created);

  const status =
    results.length === 0
      ? ["Zero columns created"]
      : results.map((r) => {
          if (r.created === true) {
            return html`<p class="success-result">
              Column ${alias} created in ${r.slug} 🙂
            </p>`;
          }
          return html`<p class="failure-result">
            No column ${alias} for ${r.slug}... ${r.error} 😭
          </p>`;
        });

  return { success, html: status };
}

function escapeDquote(str: string) {
  return str.replaceAll('"', '\\"');
}

function derivedColumnFormula(
  alias: string,
  inputs: { datasetSlug: string; datasetName: string }
) {
  const datasetName = inputs.datasetName || inputs.datasetSlug;
  return `COALESCE("${escapeDquote(datasetName)}")`;
}

type DerivedColumnCreationStatus =
  | { slug: DatasetSlug; created: true }
  | { slug: DatasetSlug; created: false; error: string };

async function createDerivedColumn(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug,
  datasetName: string,
  alias: string
): Promise<DerivedColumnCreationStatus> {
  const url = "/derived_columns/" + slug;

  if (!datasetName) {
    throw new Error("datasetName is undefined, creating dc for " + slug);
  }

  // only one is implemented right now
  const expression = derivedColumnFormula(alias, {
    datasetSlug: slug,
    datasetName,
  });
  const data = {
    alias,
    expression,
    description: "Where is this data? Created by jessitron/hny-tricks",
  };
  const result = await fetchFromHoneycombApi(
    {
      apiKey: auth.apiKey,
      keyInfo: auth.keyInfo,
      method: "POST",
      body: data,
    },
    url
  );
  if (isFetchError(result)) {
    return { slug, created: false, error: result.message };
  }
  return { slug, created: true };
}
