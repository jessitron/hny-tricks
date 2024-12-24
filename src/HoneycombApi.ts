import { trace } from "@opentelemetry/api";
import { HoneycombApiEndpointByRegion, Region } from "./common";
import { report, recordError } from "./tracing-util";

type SomeResponse = object;

export type FetchError = {
  fetchError: true;
  message: string;
};
export function isErrorResponse(
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
      return result.json();
    },
    (error) => {
      recordError(error, { "http.url": endpoint + path });
      return { fetchError: true, message: error.message };
    }
  );
}
