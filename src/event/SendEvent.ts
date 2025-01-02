import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { AVAILABLE_EVENTS, AvailableEvent } from "./send";

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
      <div class="event-form">
        <${EventSelection} availableEvents=${AVAILABLE_EVENTS} />
        <div>
          <label for="service_name">Service name (determines dataset):</label>
          <input name="service_name" value="testy-mctesterson" />
          <button
            hx-post="/event/send"
            hx-include="#auth_data"
            hx-target="#send-event-section"
            hx-swap="outerHTML"
          >
            Send
          </button>
        </div>
      </div>
    </form>
    ${status}
  </section>`;
}

export function justThisPart() {
  return html`<body><${EventSelection} availableEvents=${AVAILABLE_EVENTS}></body>`;
}

export function EventSelection(params: {
  availableEvents: Record<string, AvailableEvent>;
}) {
  return html`<div class="event-selection"></div>`;
}

export function presetEventsBit(params: {
  availableEvents: Record<string, AvailableEvent>;
}) {
  return html`<><p>Choose an event to send:</p>
    ${Object.entries(params.availableEvents)
      .map(([key, event], index) => html`<span>${key}</span>`)
      .join("")} </>`;
}

export function onePresetEvent(key: string, event: AvailableEvent) {
  return html`<div>
    <input
      type="radio"
      id=${key}
      name="event_choice"
      value=${key}
      checked=${key === "event1"}
    />
    <label for=${key}>${event.description}</label>
    <a href=${event.userViewableUrl} target="_blank">
      <img src="external-link.svg" class="icon" alt="view event definition" />
    </a>
  </div>`;
}

export function customEventBit() {
  return html`<div>
    <input type="radio" id="custom_event" name="event_choice" value="custom" />
    <label for="custom_event">custom:</label>
    <input
      type="text"
      name="custom_url"
      placeholder="Enter raw JSON URL"
      style="margin-left: 1em; width: 20em;"
      oninput="if(this.value) document.querySelector('#custom_event').checked = true"
    />
  </div>`;
}
