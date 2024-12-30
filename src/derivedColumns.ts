import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";
import { fetchFromHoneycombApi, isFetchError } from "./HoneycombApi";

type DatasetSlug = string;
type DerivedColumnAlias = string;
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
  const result = await fetchFromHoneycombApi({ apiKey: auth.apiKey, keyInfo: auth.keyInfo}, apiUrl)
  if (isFetchError(result) {
    
  })
  return html`<span data-traceid=${currentTraceId()}>🎋</span>`;
}
