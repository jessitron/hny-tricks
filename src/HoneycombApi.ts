import { trace } from "@opentelemetry/api";
import { HoneycombApiEndpointByRegion, Region } from "./common";
import { report, recordError } from "./tracing-util";
import * as pathUtil from "path";

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
    method?: "GET" | "DELETE";
    keyInfo: { region: Region };
  },
  path: string
): Promise<T | FetchError> {
  const endpoint = HoneycombApiEndpointByRegion[params.keyInfo.region];
  report({ "honeycomb.endpoint": endpoint });
  const { apiKey, method } = { method: "GET", ...params };
  const fullUrl = pathUtil.join(endpoint, path);
  return fetch(fullUrl, {
    method,
    headers: { "X-Honeycomb-Team": `${apiKey}` },
  }).then(
    async (result) => {
      if (!result.ok) {
        recordError("Result not OK", {
          "response.statusText": result.statusText,
          "response.status": result.status,
          "response.body": await result.text(),
          "http.url": fullUrl,
        });
        return {
          fetchError: true,
          message: `Received ${result.status} from ${fullUrl}. ${result.statusText}`,
        };
      }
      const resultJson = result.json();
      if (RECORD_BODY) {
        trace.getActiveSpan().addEvent("fetch " + path, {
          "response.body": JSON.stringify(resultJson, null, 2), // this gives me {} all the time and I don't know why
          "request.url": endpoint + path,
          "response.status": result.status,
        });
        console.log(
          "Response from " + path + ": " + JSON.stringify(resultJson, null, 2)
        );
      }
      return resultJson as T;
    },
    (error) => {
      recordError(error, { "http.url": endpoint + path });
      return { fetchError: true, message: error.message };
    }
  );
}
