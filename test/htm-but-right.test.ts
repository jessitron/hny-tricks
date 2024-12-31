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

  // nm, maybe it can't
  // it("Can concatenate an array of 2 strings", () => {
  //   const array = ["<p>stringy</p>", "<p>thingy</p>"];
  //   const result = html`<p>${array}</p> `;
  //   expect(result).toBe("stringy thingy");
  // });

  // it("Can concatenate an array of strings", () => {
  //   const array = ["stringy"];
  //   const result = html`${array}`;
  //   expect(result).toBe("stringy");
  // });

  // WISH: it("accepts the empty tag")
});
