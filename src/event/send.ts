import { HnyTricksAuthorization, constructEnvironmentLink } from "../common";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { html } from "../htm-but-right";
import { StatusUpdate } from "../status";
import { fetchEventJson, isFetchEventError } from "./fetch";
import { RandomIdGenerator } from "./RandomIdGenerator";

const TEST_EVENT_VERSION = "0.0.4";

const TestEvent = JSON.stringify({
  "trace.trace_id": "TRACE_ID",
  "trace.span_id": "SPAN_ID",
  name: "hello there",
  "library.name": "hny-tricks",
  "library.version": TEST_EVENT_VERSION,
});

const Event1 = {
  description: "one root span",
  url: "https://gist.github.com/jessitron/c1e01f2d6aebde4d5ee804aefa18ac7d/raw",
};

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

  const rawData = await fetchEventJson(Event1.url);
  if (isFetchEventError(rawData)) {
    return { success: false, html: rawData.message };
  }

  // minimal change. Only 1 URL expected, it contains an object.
  const data = {
    ...rawData,
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
    encodeURIComponent(JSON.stringify(queryByTransmission(transmissionId))) +
    "&tab=explore";

  return {
    success: true,
    html: html`<span>
      1 event sent. <a href=${linkToQuery} target="_blank"> 📉 </a>
    </span>`,
  };
}
