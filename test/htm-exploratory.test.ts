import htm from "htm";
import vhtml from "vhtml";

/**
 * htm + vhtml convert template strings into HTML but with JSX-style property and component expansion.
 *
 * However, it is shit in error cases, super inscrutable, and I need to understand its properties
 */
const html = htm.bind(vhtml);

describe("the htm+vhtml library", () => {
  it("ignores the tag name in closing tags", () => {
    const actual = html`<div>stuff</booger>`;
    const expected = `<div>stuff</div>`;
    expect(actual).toBe(expected);
  });
});
