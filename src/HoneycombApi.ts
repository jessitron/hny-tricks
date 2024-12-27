import { trace } from "@opentelemetry/api";
import { HoneycombApiEndpointByRegion, Region } from "./common";
import { report, recordError } from "./tracing-util";

type SomeResponse = object;

const RECORD_BODY = true; // turn this off for production

export type FetchError = {
  fetchError: true;
  message: string;
};
export function isFetchError(
  response: SomeResponse | FetchError
): response is FetchError {
  return (response as FetchError).fetchError;
}

export async function fetchFromHoneycombApi<T extends SomeResponse>(
  params: {
    apiKey: string;
    keyInfo: { region: Region };
  },
  path: string
): Promise<T | FetchError> {
  const endpoint = HoneycombApiEndpointByRegion[params.keyInfo.region];
  report({ "honeycomb.endpoint": endpoint });
  const { apiKey } = params;
  return fetch(endpoint + path, {
    method: "GET",
    headers: { "X-Honeycomb-Team": `${apiKey}` },
  }).then(
    (result) => {
      if (!result.ok) {
        recordError(
          {
            statusText: result.statusText,
            status: result.status,
            body: result.body,
          },
          { "http.url": endpoint + path }
        );
        return { fetchError: true, message: result.statusText };
      }
      const resultJson = result.json();
      if (RECORD_BODY) {
        trace.getActiveSpan().addEvent("fetch " + path, {
          "response.body": JSON.stringify(resultJson, null, 2), // this gives me {} all the time and I don't know why
          "request.url": endpoint + path,
          "response.status": result.status,
        });
      }
      return resultJson;
    },
    (error) => {
      recordError(error, { "http.url": endpoint + path });
      return { fetchError: true, message: error.message };
    }
  );
}
