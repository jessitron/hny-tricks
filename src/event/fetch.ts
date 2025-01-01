import { trace } from "@opentelemetry/api";
import { recordError } from "../tracing-util";

import JSON5 from "json5";

type SomeResponse = object;

const RECORD_BODY = true; // don't put sensitive data in your weird test event

export type FetchEventError = {
  fetchEventError: true;
  statusCode: number;
  message: string;
};
export function isFetchEventError(
  response: SomeResponse | FetchEventError
): response is FetchEventError {
  return (response as FetchEventError).fetchEventError;
}

export async function fetchEventJson(
  url: string
): Promise<object | object[] | FetchEventError> {
  return fetch(url, {
    method: "GET",
  }).then(
    async (result) => {
      if (!result.ok) {
        recordError("Result not OK from fetching event", {
          "response.statusText": result.statusText,
          "response.status": result.status,
          "response.body": await result.text(),
          "http.url": url,
        });
        return {
          fetchEventError: true,
          statusCode: result.status,
          message: `Received ${result.status} from ${url}. ${result.statusText}`,
        };
      }
      // Do not check the content type; a gist returns us text/plain

      const resultText = await result.text();

      if (RECORD_BODY) {
        trace.getActiveSpan().addEvent("fetch " + url, {
          "response.body": resultText, // this gives me {} all the time and I don't know why
          "http.url": url,
          "http.status": result.status,
        });
        console.log("Response from " + url + ": " + resultText);
      }

      try {
        return JSON5.parse(resultText);
      } catch (e) {
        return {
          fetchEventError: true,
          statusCode: result.status,
          message: `Response to ${url} was not parsable as JSON: ` + resultText,
        };
      }
    },
    (error) => {
      recordError(error, { "http.url": url });
      return { fetchEventError: true, statusCode: 0, message: error.message };
    }
  );
}
