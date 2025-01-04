import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { AVAILABLE_EVENTS, SendEventInput } from "./send";
import { currentTraceId } from "../tracing-util";

export function sendEventSection(
  auth: HnyTricksAuthorization,
  priorSelections?: SendEventInput,
  status?: Html
) {
  const selections = { service_name: "testy-mctesterson", ...priorSelections };
  const span = trace.getActiveSpan();
  span?.setAttributes({
    "app.datasets.canSendEvents": auth.permissions.canSendEvents,
  });
  if (!auth.permissions.canSendEvents) {
    return html`<section
      id="send-event-section"
      data-traceid=${currentTraceId()}
    >
      <div class="section-unavailable">
        <h3 class="section-title unavailable">Send a test span</h3>
        <p class="unavailable">
          Unavailable. This API key does not have permissions to send events.
        </p>
      </div>
    </section>`;
  }

  return html`<section id="send-event-section" data-traceid=${currentTraceId()}>
    <h3 class="section-title">Send a test span</h3>
    <form>
      <div class="event-form">
        ${eventSelection(selections)}
        <div>
          <label for="service_name">Service name (determines dataset):</label>
          <input name="service_name" value=${selections.service_name} />
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

function eventSelection(priorSelections: SendEventInput) {
  const checkedKey = priorSelections.event_choice || "event1";
  return html`<div class="event-selection">
    <p>Choose an event to send:</p>
    ${Object.entries(AVAILABLE_EVENTS).map(
      ([key, event], index) => html`
        <div>
          <input
            type="radio"
            id=${key}
            name="event_choice"
            value=${key}
            checked=${key === checkedKey}
          />
          <label for=${key}>${event.description}</label>
          <a href=${event.userViewableUrl} target="_blank">
            <img
              src="external-link.svg"
              class="icon"
              alt="view event definition"
            />
          </a>
        </div>
      `
    )}
    <div>
      <input
        type="radio"
        id="custom_event"
        name="event_choice"
        value="custom"
      />
      <label for="custom_event">custom:</label>
      <input
        type="text"
        name="custom_url"
        placeholder="Enter raw JSON URL"
        style="margin-left: 1em; width: 20em;"
        oninput="if(this.value) document.querySelector('#custom_event').checked = true"
        value=${priorSelections.custom_url}
      />
    </div>
  </div>`;
}
