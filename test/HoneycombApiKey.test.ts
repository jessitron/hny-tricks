import { interpretApiKey } from "../src/ApiKeyPrompt";

describe("checking the API key", () => {
  it("recognizes dogfood in the EU", () => {
    const inactiveDogfoodEuKey =
      "hcdik_01j26pr2kf7ag8btaf712bwdrw3jpgazcv6ajf1k0x8ntc030axykq3182";
    const result = interpretApiKey(inactiveDogfoodEuKey);
    expect(result.type).toBe("ingest");
    expect(result.environmentType).toBe("e&s");
    expect(result.region).toBe("dogfood EU");
  });
  it("recognizes dogfood in the US", () => {
    const inactiveKey =
      "hccik_01j26qmcmy3t3fyh7zh536sh7z1j2j8f1vm9qkjb0mczm117bnrb52yt5j";
    const result = interpretApiKey(inactiveKey);
    expect(result.type).toBe("ingest");
    expect(result.environmentType).toBe("e&s");
    expect(result.region).toBe("dogfood US");
  });
  it("recognizes a configuration key", () => {
    const inactiveKey = "uOexnOwfIU3LecPs1cYpLC";
    const result = interpretApiKey(inactiveKey);
    expect(result.type).toBe("configuration");
    expect(result.environmentType).toBe("e&s");
    expect(result.region).toBe("unknowable");
  });
  it("recognizes a classic configuration key", () => {
    const inactiveKey = "430eb2f22c137f6ff63980a3a332b4ac";
    const result = interpretApiKey(inactiveKey);
    expect(result.type).toBe("configuration");
    expect(result.environmentType).toBe("classic");
    expect(result.region).toBe("unknowable");
  });

  it("recognizes a management key ID in US prod", () => {
    const inactiveKeyId = "hcamk_01jjb3wjzgc54eq850gc1pbsxp";
    const result = interpretApiKey(inactiveKeyId);
    expect(result.type).toBe("management key ID");
    expect(result.environmentType).toBe("none");
    expect(result.region).toBe("US");
  });

  it("recognizes a management secret ID in US prod", () => {
    const inactiveSecret = "bj04p21fsex72d7pn4rpq5jhdd8bfkyt"; // nice
    const result = interpretApiKey(inactiveSecret);
    expect(result.type).toBe("management key secret");
    expect(result.environmentType).toBe("none");
    expect(result.region).toBe("unknowable");
  });

  it("recognizes a management secret ID in US kibble", () => {
    const inactiveKeyId = "hcemk_01jjb4gge6abc2j638rhy58r77";
    const result = interpretApiKey(inactiveKeyId);
    expect(result.type).toBe("management key ID");
    expect(result.environmentType).toBe("none");
    expect(result.region).toBe("kibble US");
  });

  it("recognizes a classic ingest key", () => {
    const inactiveKey =
      "hcaic_01j26r145dhj7th0wmm2rexgmrqc1jghy6pmjxa9k7ft22m27cx9rx5yse";
    const result = interpretApiKey(inactiveKey);
    expect(result.type).toBe("ingest");
    expect(result.environmentType).toBe("classic");
    expect(result.region).toBe("US");
  });
});
