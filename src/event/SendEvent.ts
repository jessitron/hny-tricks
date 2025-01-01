import { trace } from "@opentelemetry/api";
import { constructEnvironmentLink, HnyTricksAuthorization } from "../common";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { Html, html } from "../htm-but-right";
import { StatusUpdate } from "../status";
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

function queryByTransmission(transmissionId: string) {
  return {
    time_range: 7200,
    granularity: 0,
    breakdowns: [],
    calculations: [
      {
        op: "COUNT",
      },
    ],
    filters: [
      {
        column: "hny-tricks.transmission_id",
        op: "=",
        value: transmissionId,
      },
    ],
    filter_combination: "AND",
    orders: [],
    havings: [],
    trace_joins: [],
    limit: 100,
  };
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
  const transmissionId = gen.generateSpanId();

  const data = {
    ...TestEvent,
    "trace.trace_id": traceId,
    "trace.span_id": spanId,
    "hny-tricks.transmission_id": transmissionId,
    service_name: input.service_name,
  };

  const datasetSlug = encodeURIComponent(input.service_name);
  const url = "events/" + datasetSlug;

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

  const linkToQuery =
    constructEnvironmentLink(auth) +
    "datasets/" +
    datasetSlug +
    "?query=" +
    encodeURIComponent(JSON.stringify(queryByTransmission(transmissionId)));

  return {
    success: true,
    html: html`<span>
      1 event sent. <a href=${linkToQuery} target="_blank"> 📉 </a>
    </span>`,
  };
}
