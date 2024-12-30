import { trace } from "@opentelemetry/api";
import { HoneycombApiEndpointByRegion, Region } from "./common";
import { report, recordError } from "./tracing-util";
import * as pathUtil from "path";

type SomeResponse = object;

const RECORD_BODY = false; // turn this off for production

export type FetchError = {
  fetchError: true;
  statusCode: number;
  message: string;
};
export function isFetchError(
  response: SomeResponse | FetchError
): response is FetchError {
  return (response as FetchError).fetchError;
}

type WhatToExpectBack = "json" | "string" | "nothing";

export async function fetchFromHoneycombApi<T extends SomeResponse>(
  params: {
    apiKey: string;
    method?: "GET" | "DELETE" | "PUT";
    keyInfo: { region: Region };
    whatToExpectBack?: WhatToExpectBack;
    body?: string | object; // we'll stringify it for you
  },
  path: string
): Promise<T | FetchError> {
  const endpoint = HoneycombApiEndpointByRegion[params.keyInfo.region];
  report({ "honeycomb.endpoint": endpoint });
  const { apiKey, method, body, whatToExpectBack } = {
    method: "GET",
    whatToExpectBack: "json",
    ...params,
  };
  const fullUrl = pathUtil.join(endpoint, path);
  return fetch(fullUrl, {
    method,
    headers: { "X-Honeycomb-Team": `${apiKey}` },
    body: body ? JSON.stringify(body) : undefined,
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
          statusCode: result.status,
          message: `Received ${result.status} from ${fullUrl}. ${result.statusText}`,
        };
      }
      const resultText = await result.text();

      if (RECORD_BODY) {
        trace.getActiveSpan().addEvent("fetch " + path, {
          "response.body": resultText, // this gives me {} all the time and I don't know why
          "request.url": endpoint + path,
          "response.status": result.status,
        });
        console.log("Response from " + path + ": " + resultText);
      }

      if (whatToExpectBack !== "json") {
        return resultText as unknown as T; // hopefully you asked for a string or nothing, I'm not policing this
      }
      try {
        return JSON.parse(resultText) as T;
      } catch (e) {
        return {
          fetchError: true,
          message:
            `Response to ${fullUrl} was not parsable as JSON: ` + resultText,
        };
      }
    },
    (error) => {
      recordError(error, { "http.url": endpoint + path });
      return { fetchError: true, message: error.message };
    }
  );
}
