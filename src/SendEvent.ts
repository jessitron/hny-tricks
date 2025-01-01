import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "./common";
import { fetchFromHoneycombApi, isFetchError } from "./HoneycombApi";
import { Html, html } from "./htm-but-right";
import { StatusUpdate } from "./status";
import { RandomIdGenerator } from "./RandomIdGenerator";

const TEST_EVENT_VERSION = "0.0.1";

const TestEvent = {
  name: "hello there",
  "library.name": "hny-tricks",
  "library.version": TEST_EVENT_VERSION,
};

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

type SendEventInput = {
  service_name: string;
};
export async function sendEvent(
  auth: HnyTricksAuthorization,
  input: SendEventInput
): Promise<StatusUpdate> {
  const gen = new RandomIdGenerator();
  const traceId = gen.generateTraceId();
  const spanId = gen.generateSpanId();

  const data = {
    ...TestEvent,
    "trace.trace_id": traceId,
    "trace.span_id": spanId,
    service_name: input.service_name,
  };

  const dataset = input.service_name;
  const url = "events/" + encodeURIComponent(dataset);

  const result = await fetchFromHoneycombApi(
    {
      apiKey: auth.apiKey,
      keyInfo: auth.keyInfo,
      method: "POST",
      body: data,
      whatToExpectBack: "string",
    },
    url
  );
  if (isFetchError(result)) {
    return { success: false, html: result.message };
  }
  return { success: true, html: "1 event sent" };
}
