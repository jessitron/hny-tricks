import { EnvironmentType, KeyInfo, KeyType, Region } from "../common";
import { Html, html } from "../htm-but-right";
import { currentTraceId, report } from "../tracing-util";

export function commentOnApiKey(apiKey: string): Html {
  if (!apiKey) {
    return "";
  }
  const keyInfo = interpretApiKey(apiKey);
  const remark = remarkOnKeyInfo(keyInfo);

  return html`<span
    class="${remark.className}"
    data-traceid="${currentTraceId()}"
    >${remark.description}</span
  >`;
}

function remarkOnKeyInfo(keyInfo): {
  className: "happy" | "unhappy";
  description: string;
} {
  if (keyInfo.type === "ingest") {
    if (keyInfo.region !== "unknown") {
      return {
        className: "happy",
        description: `This looks like a ${keyInfo.region} ingest key`,
      };
    } else {
      return {
        className: "unhappy",
        description:
          "This looks like an ingest key, but I can't tell which region",
      };
    }
  } else if (
    keyInfo.type === "configuration" &&
    keyInfo.environmentType === "classic"
  ) {
    return {
      className: "happy",
      description: "That looks like a Honeycomb Classic configuration key.",
    };
  } else if (keyInfo.type === "configuration") {
    return {
      className: "happy",
      description: "That looks like a Honeycomb configuration key. Great.",
    };
  } else if (keyInfo.type === "management key ID") {
    return {
      className: "unhappy",
      description:
        "That looks like a management key ID. I need a configuration or ingest key.",
    };
  } else if (keyInfo.type === "management key secret") {
    return {
      className: "unhappy",
      description:
        "That might be a management key secret. I need a configuration or ingest key.",
    };
  }
  return {
    className: "unhappy",
    description: "That doesn't look like an API key",
  };
}

function regionByLetter(letter: string): Region {
  switch (letter) {
    case "a":
      return "US";
    case "b":
      return "EU";
    case "c":
      return "dogfood US";
    case "d":
      return "dogfood EU";
    case "e":
      return "kibble US";
    case "f":
      return "kibble EU";
  }
}

export function interpretApiKey(apiKey: string): KeyInfo {
  let keyType: KeyType = "none";
  let region: Region = "unknown";
  let environmentType: EnvironmentType = "none";
  if (apiKey.length === 64 && apiKey.match(/^hc[abcdef]i[kc]_[a-z0-9]{58}$/)) {
    keyType = "ingest";
    region = regionByLetter(apiKey[2]);
    switch (apiKey[4]) {
      case "c":
        environmentType = "classic";
        break;
      case "k":
        environmentType = "e&s";
        break;
    }
  } else if (apiKey.match(/^[a-zA-Z0-9]{22}$/)) {
    keyType = "configuration";
    environmentType = "e&s";
    region = "unknowable";
  } else if (apiKey.match(/^[a-f0-9]{32}$/)) {
    keyType = "configuration";
    environmentType = "classic";
    region = "unknowable";
  } else if (apiKey.match(/^hc[abcdef]mk_[a-z0-9]{26}$/)) {
    keyType = "management key ID";
    environmentType = "none";
    region = regionByLetter(apiKey[2]);
  } else if (apiKey.match(/^[a-z0-9]{32}$/)) {
    keyType = "management key secret";
    environmentType = "none";
    region = "unknowable";
  }
  report({
    "honeycomb.key.type": keyType,
    "honeycomb.key.region": region,
    "honeycomb.key.environmentType": environmentType,
  });
  return { type: keyType, environmentType, region };
}
