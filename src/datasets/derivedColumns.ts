import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { Column, Html, HnyTricksDataset } from "./dataset_common";
import { StatusUpdate } from "../status";

type DatasetSlug = string;
type DerivedColumnAlias = string;

export class DerivedColumnForDatasetName implements Column {
  constructor() {}

  header(): Html {
    return html`<th scope="col">dc.dataset</th>`;
  }
  row(d: HnyTricksDataset, i: number): Html {
    const url = `/datasets/dc/exists?slug=${d.slug}&alias=dc.dataset&row=${i}`;
    return html`<td
      hx-trigger="intersect"
      hx-post=${url}
      hx-include="#auth_data"
    >
      💬
    </td>`;
  }
  footer(): Html {
    return html`<td>
      <button
        hx-post="/datasets/dc/create-all?alias=dc.dataset"
        hx-target="#dataset-section"
        hx-include="#auth_data"
        title="make these derived columns"
      >
        Create
      </button>
    </td>`;
  }
}

export async function derivedColumnExists(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug,
  alias: DerivedColumnAlias,
  row: string
) {
  const span = trace.getActiveSpan();
  span.setAttributes({
    "app.derived_column.slug": slug,
    "app.derived_column.alias": alias,
  });

  const apiUrl = `derived_columns/${slug}?alias=${alias}`;
  const result = await fetchFromHoneycombApi(
    { apiKey: auth.apiKey, keyInfo: auth.keyInfo },
    apiUrl
  );
  if (isFetchError(result)) {
    if (result.statusCode === 404) {
      return html`<span data-traceid=${currentTraceId()}
        ><input
          class="create-dc-checkbox"
          type="checkbox"
          checked
          name="create_${encodeURIComponent(alias)}_for_${row}"
          title="absent. create?"
      /></span>`;
    } else {
      return html`<span data-traceid=${currentTraceId()}>😵</span>`;
    }
  }
  return html`<span
    title="derived column exists"
    data-traceid=${currentTraceId()}
    >☘️</span
  >`;
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
        decodeURIComponent(inputs[`dataset-name-${i}`]),
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

  return { success, html: status.join(" ") };
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
  const expression = `COALESCE("${datasetName}")`;
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
