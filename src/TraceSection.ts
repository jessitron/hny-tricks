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
          hx-include="#auth_data">
        </input>
        <span id="trace-actions"></span>
    </div>
</section>`;
}

export async function TraceActions(
  auth: HnyTricksAuthorization,
  traceId: string
) {
  const traceUrl =
    constructEnvironmentLink(auth) + `/trace?trace_id=${traceId}`;
  return html`<span>
    <a class="button-link" href="${traceUrl}" target="_blank">
      Look for it <img src="external-link.svg" />
    </a>
  </span>`;
}
