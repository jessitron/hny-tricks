const { html } = require("../src/htm-but-right");

describe("making htm work better in error cases", () => {
  it("when I forget to close a tag, gives me a recognizable error", () => {
    const result = html`<div><span>hello</div>`;
    //  expect(result).toBe("<div><span>hello</span></div>"); // this is what htm gives back
    expect(result).toBe(
      "<div style='color:red'>Invalid HTML detected. Did you forget to close a tag?<hr/>div,<span>hello</span><hr/></div>"
    );
  });

  it("when the html is fine, returns a string", () => {
    const result = html`<div><span>hello</span></div>`;
    expect(result).toBe("<div><span>hello</span></div>");
  });
});
