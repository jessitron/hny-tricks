import { HnyTricksAuthorization } from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

export function TraceSection(authResult: HnyTricksAuthorization) {
  return html`<section data-traceid=${currentTraceId()} id="trace-section">
    <h3 class="section-title" >Go directly to a trace</h3>
    <form id="trace-form">
        <label for="trace-id">Trace ID</label>
        <input id="trace-id" name="trace-id" 
          hx-post="/trace"
          hx-target="#trace-actions"
          hx-swap="innerHTML"
          hx-trigger="input changed throttle:200ms"
          include="#apikey">
        </input>
    </form>
    <div id="trace-actions"></div>
</section>`;
}

export function TraceActions(apikey: string, traceId: string) {
  return html`<span>Do Something Here</span>`;
}
