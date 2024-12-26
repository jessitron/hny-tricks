import { html } from "./htm-but-right";
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
import { fetchFromHoneycombApi, isErrorResponse } from "./HoneycombApi";
import {
  currentTraceId,
  inSpan,
  inSpanAsync,
  recordError,
  report,
} from "./tracing-util";

export const startingApiKeyPrompt = html`<${ApiKeyPrompt}
  destinationElement="#stuff"
  endpointToPopulateItWith="/team"
  endpointForApiKeyValidation="/validate"
/>`;

export function ApiKeyPrompt(params: {
  destinationElement: string;
  endpointToPopulateItWith: string;
  endpointForApiKeyValidation: string;
}): string {
  return html`<section id="apikey-section" class="apiKey">
    <form hx-post="${params.endpointToPopulateItWith}" hx-target="#apikey-section" hx-swap="outerHTML" id="apikey-form" hx-indicator="#big-think">
      <div>
        <label for="apikey">Honeycomb API Key: <span id="reveal-password" tron-reveal="#apikey">👁</span></label>
        <input id="apikey" type="password" 
          name="apikey"
          hx-trigger="input changed throttle:200ms"
          hx-post="${params.endpointForApiKeyValidation}"
          hx-target="#apikey-opinion"
          hx-include="#apikey" 
          hx-swap="innerHTML"></input>
        <button>Check Permissions</button>
      </div>
      <div id="apikey-opinion">
      </div>
    </form>
    <p class="fine-print">This API key will be sent to the Honeycomb Tricks backend, but we don't save it.
    </p> 
    <script src="/jess.js"></script>
 </section>`;
}

export function commentOnApiKey(apiKey: string): string {
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
        description: "This looks like a ${keyInfo.region} ingest key",
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

export function interpretApiKey(apiKey: string): KeyInfo {
  let keyType: KeyType = "none";
  let region: Region = "unknown";
  let environmentType: EnvironmentType = "none";
  if (apiKey.length === 64 && apiKey.match(/^hc[abcd]i[kc]_[a-z0-9]{58}$/)) {
    keyType = "ingest";
    switch (apiKey[2]) {
      case "a":
        region = "US";
        break;
      case "b":
        region = "EU";
        break;
      case "c":
        region = "dogfood US";
        break;
      case "d":
        region = "dogfood EU";
        break;
    }
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
  }
  trace.getActiveSpan()?.setAttributes({
    "honeycomb.key.type": keyType,
    "honeycomb.key.region": region,
    "honeycomb.key.environmentType": environmentType,
  });
  return { type: keyType, environmentType, region };
}

type AuthError = {
  authError: true;
  html: string;
};
function authError(htmlInput: string): AuthError {
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
  if (isErrorResponse(response)) {
    return authError(html`<div>
      <span class="unhappy">Auth check failed: ${response.message}</span>
    </div>`);
  }
  return describeAuthorization(apiKey, keyInfo, response);
}

async function tryAllRegions(apiKey: string): Promise<Region> {
  return inSpanAsync(
    "hny-tricks/honeycomb-api-key",
    "try all regions",
    async (span) => {
      const regions = Object.keys(HoneycombApiEndpointByRegion) as Region[]; // is there a cleverer way to do that?
      let regionsTried = 0;
      let regionIdentified: Region = "unknown";
      for (const region of regions) {
        const response = await fetchFromHoneycombApi<HoneycombAuthResponse>(
          { apiKey, keyInfo: { region } },
          "auth"
        );
        regionsTried++;
        if (!isErrorResponse(response)) {
          regionIdentified = region;
          break;
        }
      }

      report({
        "honeycomb.region": regionIdentified,
        "app.regionsTried": regionsTried,
      });
      return regionIdentified;
    }
  );
}
