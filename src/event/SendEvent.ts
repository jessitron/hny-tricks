import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";

export function sendEventSection(auth: HnyTricksAuthorization, status?: Html) {
  const span = trace.getActiveSpan();
  span?.setAttributes({
    "app.datasets.canSendEvents": auth.permissions.canSendEvents,
  });
  if (!auth.permissions.canSendEvents) {
    return html`<section id="send-event-section">
      <div class="section-unavailable">
        <h3 class="section-title unavailable">Send a test span</h3>
        <p class="unavailable">
          Unavailable. This API key does not have permissions to send events.
        </p>
      </div>
    </section>`;
  }

  return html`<section id="send-event-section">
    <h3 class="section-title">Send a test span</h3>
    <form>
        <label for="service_name">Service name (determines dataset):</label>
        <input name="service_name" value="testy-mctesterson"></input>
        <button hx-post="/event/send" hx-include=#auth_data hx-target="#send-event-section" hx-swap="outerHTML">Send</button>
    </form>
    ${status}
  </section>`;
}
