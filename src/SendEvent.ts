import { HnyTricksAuthError, HnyTricksAuthorization, StatusUpdate } from "./common";
import { Html, html } from "./htm-but-right";

const TEST_EVENT_VERSION = "0.0.1";

const TestEvent = {
  name: "hello there",
  "library.name": "hny-tricks",
  "library.version": "TEST_EVENT_VERSION",
};

export function SendEvent(status?: Html) {
  return html`<section id="send-event-section">
    <h3 class="section-title">Send a test span</h3>
    <form>
        <label for="service-name">Service name (determines dataset):</label>
        <input name="service-name" value="testy-mctesterson"></input>
        <button hx-post="/send-event" hx-include=#auth_data >Send</button>
    </form>
    ${status}
  </section>`;
}

export async function sendEvent(
  auth: HnyTricksAuthorization
): Promise<StatusUpdate> {
  return { success: false, html: "unimplemented" };
}
