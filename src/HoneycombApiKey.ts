import { html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import { teamDescription } from "./Team";
import {
  Region,
  KeyType,
  KeyInfo,
  EnvironmentType,
  HoneycombAuthResponse,
  HoneycombEndpointByRegion,
} from "./common";

export function ApiKeyPrompt(params: { destinationElement: string, endpointToPopulateItWith: string }): string {
  return html`<section class="apiKey">
    <form hx-post="${params.endpointToPopulateItWith}" hx-target="${params.destinationElement}" id="apikey-form" hx-indicator="#big-think">
      <div>
        <label for="apikey">Honeycomb API Key: <span id="reveal-password" tron-reveal="#apikey">👁</span></label>
        <input id="apikey" type="password" name="apikey" hx-get="/validate" hx-target="#apikey-opinion" hx-include="#apikey" ></input>
        <button>Check Permissions</button>
      </div>
      <div>
        <span id="apikey-opinion"></span>
      </div>
    </form>
    <p class="fine-print">This API key will be sent to the Honeycomb Tricks backend, but we don't save it. We call the Honeycomb auth endpoint,
    and then tell you which team and environment it belongs to, and which permissions it has.
    </p> 
    <script src="/jess.js"></script>
 </section>`;
}

export function commentOnApiKey(apiKey: string): string {
  if (!apiKey) {
    return "";
  }
  const keyInfo = interpretApiKey(apiKey);
  if (keyInfo.type === "ingest") {
    if (keyInfo.region !== "unknown") {
      return html`<span class="happy"
        >This looks like a ${keyInfo.region} ingest key</span
      >`;
    } else {
      return html`<span class="unhappy"
        >This looks like an ingest key, but I can't tell which region</span
      >`;
    }
  } else if (keyInfo.type === "configuration") {
    return html`<span class="happy"
      >That looks like a Honeycomb configuration key. Great.</span
    >`;
  }
  return html`<span class="unhappy">That doesn't look like an API key</span>`;
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

export async function authorize(apiKey: string): Promise<string> {
  if (!apiKey) {
    return html`<div><span class="unhappy">No API key provided</span></div>`;
  }

  const keyInfo = interpretApiKey(apiKey);
  if (keyInfo.region === "unknown") {
    return html`<div>
      <span class="unhappy">This doesn't look like an API key</span>
    </div>`;
  }
  if (keyInfo.region === "unknowable") {
    const workingRegion = await tryAllRegions(apiKey);
    if (workingRegion === "unknown") {
      return html`<div>
        <span class="unhappy">
          That API key did not work in any Honeycomb region. 😭
        </span>
      </div>`;
    }
    keyInfo.region = workingRegion; // now we know.
  }
  const endpoint = HoneycombEndpointByRegion[keyInfo.region];
  trace.getActiveSpan()?.setAttribute("honeycomb.endpoint", endpoint);
  const response = await fetchPermissions({ apiKey, endpoint });
  trace
    .getActiveSpan()
    ?.setAttributes({ "honeycomb.auth.response": JSON.stringify(response) });
  if (isErrorResponse(response)) {
    return html`<div>
      <span class="unhappy">Auth check failed: ${response.message}</span>
    </div>`;
  }
  return teamDescription({ keyInfo, permissions: response });
}

type FetchError = {
  fetchError: true;
  message: string;
};
function isErrorResponse(
  response: HoneycombAuthResponse | FetchError
): response is FetchError {
  return (response as FetchError).fetchError;
}

async function fetchPermissions(params: {
  apiKey: string;
  endpoint: string;
}): Promise<HoneycombAuthResponse | FetchError> {
  const { apiKey, endpoint } = params;
  return fetch(endpoint + "auth/", {
    method: "GET",
    headers: { "X-Honeycomb-Team": `${apiKey}` },
  }).then(
    (result) => {
      if (!result.ok) {
        return { fetchError: true, message: result.statusText };
      }
      return result.json();
    },
    (error) => ({ fetchError: true, message: error.message })
  );
}

async function tryAllRegions(apiKey: string): Promise<Region> {
  const regions = Object.keys(HoneycombEndpointByRegion) as Region[]; // is there a more clever way to do that?
  for (const region of regions) {
    const endpoint = HoneycombEndpointByRegion[region];
    const response = await fetchPermissions({ apiKey, endpoint });
    if (!isErrorResponse(response)) {
      return region;
    }
  }
  return "unknown";
}
