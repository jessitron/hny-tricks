import htm from "htm";
import vhtml from "vhtml";

/**
 * htm + vhtml convert template strings into HTML but with JSX-style property and component expansion.
 * 
 * However, it is shit in error cases, super inscrutable, and I want to make that more obvious.
 */
const htmlOriginal = htm.bind(vhtml);

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
    return htmlOriginal(strings, ...values);
}