import htm from "htm";
import vhtml from "vhtml";
import { trace } from "@opentelemetry/api";
import { currentTraceId } from "./tracing-util";

/**
 * htm + vhtml convert template strings into HTML but with JSX-style property and component expansion.
 *
 * However, it is shit in error cases, super inscrutable, and I want to make that more obvious.
 */
const htmlOriginal = htm.bind(vhtml);

export type Html = string | string[];
/**
 * Right before sending back to the client, turn this into a string.
 *
 * More than one element comes out as an array, which is OK for combining
 * into larger blocks of Html. If you normalize that into a string, it won't
 * combine right, it'll get escaped.
 *
 * @param html some output of html`...`
 * @returns string
 */
export function normalizeHtml(html: Html): string {
  if (typeof html === "string") {
    return html;
  } else return html.join("");
}

export const html = (strings: TemplateStringsArray, ...values: any[]): Html => {
  try {
    const result = htmlOriginal(strings, ...values);

    if (typeof result === "string") {
      return result;
    }
    // if result is an array, return
    if (
      Array.isArray(result) &&
      result.length > 0 &&
      typeof result[0] === "string" &&
      result[0].startsWith("<")
    ) {
      // this looks like an array of multiple top-level elements
      return result;
    }
    // console.log("what is the result? " + result);
    const span = trace.getActiveSpan();
    span?.addEvent("Interfering with HTML", {
      "app.inputStrings": strings.join(", "),
      "app.inputValues": values.join(", "),
      "app.htm_result_type": typeof result,
      "app.htm_result": JSON.stringify(result),
    });
    return `<div data-traceid=${currentTraceId()} style="color:red">
      Invalid HTML detected. Did you forget to close a tag?
      <hr />
      ${result}
      <hr />
    </div>`;
  } catch (err) {
    console.log(err);
    console.log(err.printStackTrace);
    // "h.push is not a function", I got that when I had extra closing tags
    // I got an error inside my own code when I forgot to have my component-function accept a params object
    return `<div data-traceid=${currentTraceId()} style='color:red'>Invalid HTML detected. Do you have an extra closing tag?<hr/>${JSON.stringify(
      strings
    )}<hr/></div>`;
  }
};
