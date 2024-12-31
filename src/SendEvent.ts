import { HnyTricksAuthorization } from "./common";
import { Html, html } from "./htm-but-right";
import { StatusUpdate } from "./status";

const TEST_EVENT_VERSION = "0.0.1";

const TestEvent = {
  name: "hello there",
  "library.name": "hny-tricks",
  "library.version": TEST_EVENT_VERSION,
};

export function sendEventSection(status?: Html) {
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

type SendEventInput = {
  service_name: string;
};
export async function sendEvent(
  auth: HnyTricksAuthorization,
  input: SendEventInput
): Promise<StatusUpdate> {
  return { success: false, html: "unimplemented" };
}
