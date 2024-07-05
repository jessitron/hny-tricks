const html = require('../src/htm-but-right');

describe('making htm work better in error cases', () => {

    it("when I forget to close a tag", () => {
        const result = html`<div><span>hello</div>`;
        expect(result).toBe('<div><span>hello</span></div>');
    })
})