import htm from "htm";
import vhtml from "vhtml";

/**
 * htm + vhtml convert template strings into HTML but with JSX-style property and component expansion.
 *
 * However, it is shit in error cases, super inscrutable, and I want to make that more obvious.
 */
const htmlOriginal = htm.bind(vhtml);

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  const result = htmlOriginal(strings, ...values);
  if (typeof result === "string") {
    return result;
  }
  return `<div style='color:red'>Invalid HTML detected. Did you forget to close a tag?<hr/>${result}<hr/></div>`;
};
