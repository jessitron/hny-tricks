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

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  try {
    const result = htmlOriginal(strings, ...values);

    if (typeof result === "string") {
      return result;
    }
    const span = trace.getActiveSpan();
    span?.addEvent("Interfering with HTML", {
      "app.inputStrings": strings.join(", "),
      "app.inputValues": values.join(", "),
      "app.htm_result_type": typeof result,
      "app.htm_result": JSON.stringify(result),
    });
    return `<div data-traceid=${currentTraceId()} style='color:red'>Invalid HTML detected. Did you forget to close a tag?<hr/>${result}<hr/></div>`;
  } catch (err) {
    console.log(err);
    console.log(err.printStackTrace);
    // "h.push is not a function", I got that when I had extra closing tags
    return `<div data-traceid=${currentTraceId()} style='color:red'>Invalid HTML detected. Do you have an extra closing tag?<hr/>${JSON.stringify(
      strings
    )}<hr/></div>`;
  }
};
