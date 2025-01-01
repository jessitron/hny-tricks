import { HnyTricksAuthorization, constructEnvironmentLink } from "../common";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { html } from "../htm-but-right";
import { StatusUpdate } from "../status";
import { fetchEventJson, isFetchEventError } from "./fetch";
import { RandomIdGenerator } from "./RandomIdGenerator";

type AvailableEvent = {
  description: string;
  userViewableUrl: string;
  rawUrl: string;
};

export const AVAILABLE_EVENTS: Record<string, AvailableEvent> = {
  event1: {
    description: "one root span",
    userViewableUrl:
      "https://gist.github.com/jessitron/c1e01f2d6aebde4d5ee804aefa18ac7d",
    rawUrl:
      "https://gist.github.com/jessitron/c1e01f2d6aebde4d5ee804aefa18ac7d/raw",
  },
  event2: {
    description: "structured log",
    userViewableUrl:
      "https://gist.github.com/jessitron/ec40d3622721177d2fbdb7195aac2c39",
    // for some reason, the raw URL for this one doesn't update when I edit the gist :-(
    rawUrl:
      "https://gist.githubusercontent.com/jessitron/ec40d3622721177d2fbdb7195aac2c39/raw/0f1bba813f1454dd374f9db3344bc6b732dcc1b9/structured-log.json",
  },
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
  event_choice: string;
};
export async function sendEvent(
  auth: HnyTricksAuthorization,
  input: SendEventInput
): Promise<StatusUpdate> {
  const gen = new RandomIdGenerator();
  const traceId = gen.generateTraceId();
  const spanId = gen.generateSpanId();
  const transmissionId = gen.generateSpanId();

  const chosenEvent = AVAILABLE_EVENTS[input.event_choice];
  if (!chosenEvent) {
    throw new Error("Bug. What kind of event choice is " + input.event_choice);
  }

  const rawData = await fetchEventJson(chosenEvent.rawUrl);
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
