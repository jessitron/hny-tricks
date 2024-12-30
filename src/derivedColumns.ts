import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

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
  return html`<span data-traceid=${currentTraceId()}>🎋</span>`;
}
