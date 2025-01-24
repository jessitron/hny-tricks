import { Html, html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import {
  Region,
  KeyType,
  KeyInfo,
  EnvironmentType,
  HoneycombAuthResponse,
  HoneycombApiEndpointByRegion,
  describeAuthorization,
  HnyTricksAuthorization,
} from "./common";
import { fetchFromHoneycombApi, isFetchError } from "./HoneycombApi";
import {
  currentTraceId,
  inSpan,
  inSpanAsync,
  recordError,
  report,
} from "./tracing-util";

export const ELEMENT_CONTAINING_ALL_SECTIONS = "#stuff";
export const ENDPOINT_TO_POPULATE_ALL_SECTIONS = "/team";

export const startingApiKeyPrompt = html`<${ApiKeyPrompt}
  destinationElement="${ELEMENT_CONTAINING_ALL_SECTIONS}"
  endpointToPopulateItWith="${ENDPOINT_TO_POPULATE_ALL_SECTIONS}"
  endpointForApiKeyValidation="/validate"
/>`;

export function ApiKeyPrompt(params: {
  destinationElement: string;
  endpointToPopulateItWith: string;
  endpointForApiKeyValidation: string;
}): Html {
  return html`<section id="apikey-section" class="apiKey">
    <form hx-post="${params.endpointToPopulateItWith}" hx-target="${params.destinationElement}" hx-swap="innerHTML" id="apikey-form" hx-indicator="#big-think">
      <div>
        <label for="apikey">Honeycomb API Key <a href="https://docs.honeycomb.io/get-started/configure/environments/manage-api-keys/" target="_blank">
         ❔
          </a> <span id="reveal-password" tron-reveal="#apikey">👁</span></label>
        <input id="apikey" type="password" 
          name="apikey"
          hx-trigger="input changed throttle:200ms"
          hx-post="${params.endpointForApiKeyValidation}"
          hx-target="#apikey-opinion"
          hx-include="#apikey" 
          hx-swap="innerHTML"></input>
        <button>Give Me Options</button>
      </div>
      <div id="apikey-opinion">
      </div>
    </form>
    <script src="/jess.js"></script>
 </section>`;
}

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
  }
  return {
    className: "unhappy",
    description: "That doesn't look like an API key",
  };
}

export function regionByLetter(letter: string): Region {
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
  trace.getActiveSpan()?.setAttributes({
    "honeycomb.key.type": keyType,
    "honeycomb.key.region": region,
    "honeycomb.key.environmentType": environmentType,
  });
  return { type: keyType, environmentType, region };
}

export type AuthError = {
  authError: true;
  html: Html;
};
function authError(htmlInput: Html): AuthError {
  const wrappedHtml = html`<div data-traceid="${currentTraceId()}">
    ${htmlInput}
  </div>`;

  return { authError: true, html: wrappedHtml };
}
export function isAuthError(
  response: HnyTricksAuthorization | AuthError
): response is AuthError {
  return (response as AuthError).authError;
}

export async function authorize(
  apiKey: string
): Promise<HnyTricksAuthorization | AuthError> {
  if (!apiKey) {
    recordError(new Error("no API key provided"));
    return authError(
      html`<div>
        <span class="unhappy">
          Trying to authorize, but API key is blank. This part doesn't work yet
        </span>
      </div>`
    );
  }

  const keyInfo = interpretApiKey(apiKey);
  if (keyInfo.region === "unknown") {
    return authError(html`<div>
      <span class="unhappy">This doesn't look like an API key</span>
    </div>`);
  }
  if (keyInfo.region === "unknowable") {
    const workingRegion = await tryAllRegions(apiKey);
    if (workingRegion === "unknown") {
      return authError(html`<div>
        <span class="unhappy">
          That API key did not work in any Honeycomb region. 😭
        </span>
      </div>`);
    }
    keyInfo.region = workingRegion; // now we know.
  }
  const response = await fetchFromHoneycombApi<HoneycombAuthResponse>(
    { apiKey, keyInfo },
    "auth"
  );
  trace
    .getActiveSpan()
    ?.setAttributes({ "honeycomb.auth.response": JSON.stringify(response) });
  if (isFetchError(response)) {
    return authError(html`<div>
      <span class="unhappy">Auth check failed: ${response.message}</span>
    </div>`);
  }
  return describeAuthorization(apiKey, keyInfo, response);
}

async function tryAllRegions(apiKey: string): Promise<Region> {
  return inSpanAsync("try the API key in all regions", async (span) => {
    const regions = Object.keys(HoneycombApiEndpointByRegion) as Region[]; // is there a cleverer way to do that?
    const regionIdentified = (await Promise.any(
      regions.map((region) =>
        inSpanAsync("try region " + region, async () => {
          const response = await fetchFromHoneycombApi<HoneycombAuthResponse>(
            { apiKey, keyInfo: { region } },
            "auth"
          );
          if (isFetchError(response)) {
            throw new Error("Well, it didn't work in " + region);
          } else {
            return region;
          }
        })
      )
    ).catch((allRejected) => {
      return "unknown";
    })) as Region;

    report({
      "honeycomb.region": regionIdentified,
      "app.regionsTried": regions.length,
    });
    return regionIdentified;
  });
}
