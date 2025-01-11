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

  it("sometimes does not escape html when inserted as a value", () => {
    const inner = html`<p>stuff</p>`;
    const outer = html`<div>${inner}</div>`;
    const expected = `<div><p>stuff</p></div>`;
    expect(outer).toBe(expected);
  });

  it("sometimes does escape html when inserted as a value", () => {
    const currentTraceId = "s;aofdjhaldkjfhalskjdhf";
    const status = {
      success: true,
      html: [
        html`<p class="success-result">
          Column dc.dataset created in observaquiz-browser 🙂
        </p>`,
        html`<p class="success-result">
          Column dc.dataset created in observaquiz-bff 🙂
        </p>`,
      ].join(" "),
    };
    const actual = html`<div
      data-traceid=${currentTraceId}
      class="status ${status.success ? "happy" : "unhappy"}"
    >
      ${status.html}
    </div>`;

    const expected = `<div data-traceid=\"s;aofdjhaldkjfhalskjdhf\" class=\"status happy\">&lt;p class=&quot;success-result&quot;&gt;Column dc.dataset created in observaquiz-browser 🙂&lt;/p&gt; &lt;p class=&quot;success-result&quot;&gt;Column dc.dataset created in observaquiz-bff 🙂&lt;/p&gt;</div>`;
    expect(actual).toBe(expected);
  });
});
