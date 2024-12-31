import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";

type DatasetSlug = string;
type DerivedColumnAlias = string;

export function urlForDerivedColumnExists(slug: DatasetSlug) {
  return `/datasets/dc/exists?slug=${slug}&alias=dc.dataset`;
}
export async function derivedColumnExists(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug,
  alias: DerivedColumnAlias
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
          name="create_dc_dataset_for_${slug}"
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
