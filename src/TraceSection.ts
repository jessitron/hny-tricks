import { trace } from "@opentelemetry/api";
import { authorize, isAuthError } from "./ApiKeyPrompt";
import { constructEnvironmentLink, HnyTricksAuthorization } from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

export function TraceSection(authResult: HnyTricksAuthorization) {
  return html`<section data-traceid=${currentTraceId()} id="trace-section">
    <h3 class="section-title" >Go directly to a trace</h3>
    <div>
        <label for="trace-id">Trace ID</label>
        <input id="trace-id" name="trace-id" 
          hx-post="/trace"
          hx-target="#trace-actions"
          hx-swap="innerHTML"
          hx-trigger="input changed throttle:200ms"
          hx-include="#apikey">
        </input>
    </div>
    <div id="trace-actions"></div>
</section>`;
}

export async function TraceActions(apikey: string, traceId: string) {
  const span = trace.getActiveSpan();
  const authResult = await authorize(apikey);
  if (isAuthError(authResult)) {
    span?.setAttributes({ "hny.authError": authResult.html });
    span?.setStatus({ code: 2, message: "auth failed" });
    return authResult.html;
  }
  const traceUrl =
    constructEnvironmentLink(authResult) + `/trace?trace_id=${traceId}`;
  return html`<span
    ><a href="${traceUrl}" target="_blank">Look for it (new tab)</a></span
  >`;
}
