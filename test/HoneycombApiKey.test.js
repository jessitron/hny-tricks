const { interpretApiKey } = require("../src/HoneycombApiKey");

describe("checking the API key", () => {
  it("recognizes dogfood in the EU", () => {
    const inactiveDogfoodEuKey =
      "hcdik_01j26pr2kf7ag8btaf712bwdrw3jpgazcv6ajf1k0x8ntc030axykq3182";
    const result = interpretApiKey(inactiveDogfoodEuKey);
    expect(result.type).toBe("ingest");
    expect(result.region).toBe("dogfood EU");
  });
  it("recognizes dogfood in the US", () => {
    const inactiveKey =
      "hccik_01j26qmcmy3t3fyh7zh536sh7z1j2j8f1vm9qkjb0mczm117bnrb52yt5j";
    const result = interpretApiKey(inactiveKey);
    expect(result.type).toBe("ingest");
    expect(result.region).toBe("dogfood US");
  });
});
