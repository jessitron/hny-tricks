import { html } from "../src/htm-but-right";

describe("making htm work better in error cases", () => {
  it("when I forget to close a tag, gives me a recognizable error", () => {
    const result = html`<div><span>hello</div>`;
    //  expect(result).toBe("<div><span>hello</span></div>"); // this is what htm gives back
    expect(result).toContain("Invalid HTML detected.");
  });

  it("when the html is fine, returns a string", () => {
    const result = html`<div><span>hello</span></div>`;
    expect(result).toBe("<div><span>hello</span></div>");
  });

  // WISH: it("accepts the empty tag")
});
