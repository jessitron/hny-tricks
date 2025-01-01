import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { Event1, Event2 } from "./send";

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
        <div class="event-selection">
            <p>Choose an event type:</p>
            <div>
                <input type="radio" id="event1" name="event_type" value="event1" checked />
                <label for="event1">One Root Span</label>
                <a href=${Event1.url.replace('/raw', '')} target="_blank">
                    <img src="external-link.svg" class="icon" alt="view event definition" />
                </a>
            </div>
            <div>
                <input type="radio" id="event2" name="event_type" value="event2" />
                <label for="event2">Structured Log</label>
                <a href=${Event2.url.replace('/raw', '')} target="_blank">
                    <img src="external-link.svg" class="icon" alt="view event definition" />
                </a>
            </div>
        </div>
        <label for="service_name">Service name (determines dataset):</label>
        <input name="service_name" value="testy-mctesterson" />
        <button hx-post="/event/send" hx-include=#auth_data hx-target="#send-event-section" hx-swap="outerHTML">Send</button>
    </form>
    ${status}
  </section>`;
}
