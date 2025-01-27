import { Html, html } from "./htm-but-right";
import {
  Region,
  HoneycombAuthResponse,
  HoneycombApiEndpointByRegion,
  HnyTricksAuthorization,
} from "./common";
import { fetchFromHoneycombApi, isFetchError } from "./HoneycombApi";
import {
  currentTraceId,
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
