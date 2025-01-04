import { trace } from "@opentelemetry/api";
import {
  authorize,
  ELEMENT_CONTAINING_ALL_SECTIONS,
  ENDPOINT_TO_POPULATE_ALL_SECTIONS,
  isAuthError,
  startingApiKeyPrompt,
} from "./ApiKeyPrompt";
import { TraceSection as traceSection } from "./TraceSection";
import {
  constructEnvironmentLink,
  HnyTricksAuthError,
  HnyTricksAuthorization,
  HoneycombUIEndpointByRegion,
  spanAttributesAboutAuth,
} from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";
import { sendEventSection } from "./event/SendEvent";
import { datasetSection } from "./datasets/datasets";

/**
 * why is this file capitalized? I haven't figured out the standards for that yet.
 * it represents responses to the /team html call.
 */

export async function team(apikey) {
  // TODO: do this part in main?
  const span = trace.getActiveSpan();
  if (!apikey) {
    span.setAttribute("warning", "no api key received");
    return startingApiKeyPrompt;
  }
  const auth = await authorize(apikey);
  if (isAuthError(auth)) {
    span?.setAttributes({ "hny.authError": auth.html });
    span?.setStatus({ code: 2, message: "auth failed" });
    return auth.html; // TODO: return the ApiKeyPrompt again
  }
  span?.setAttributes(spanAttributesAboutAuth(auth));

  return html`<div data-traceid=${currentTraceId()}>
    ${teamDescription(auth)} ${traceSection(auth)} ${sendEventSection(auth)}
    ${datasetSection()}
  </div>`;
}

export function teamDescription(auth: HnyTricksAuthorization) {
  const envLink = constructEnvironmentLink(auth);
  return html`<section class="team" id="team-section">
    <div class="team-description team-apikey">
        <label for="apikey">Honeycomb API Key: <span id="reveal-password" tron-reveal="#apikey-input">👁</span></label>
            <input id="apikey-input" type="password" name="apikey-input" disabled="true" value="${
              auth.apiKey
            }" ></input>
            <input class="invisible" id="apikey" name="apikey" value="${
              auth.apiKey
            }" />
            <input class="invisible" id="auth_data" name="auth_data" value=${encodeURIComponent(
              JSON.stringify(auth)
            )} />
            <button onclick="window.location = window.location"> Reset </button>
    </div>
    <div class="team-description team-region">Region: ${
      auth.keyInfo.region
    }</div>
    <div class="team-description team-name">Team: ${auth.team.name}</div>
    <div class="team-description team-env">
      Environment: ${auth.environment.name || "Classic"} 
    </div>
    <div class="team-link"><a href=${envLink} target="_blank"> ${envLink} </a>   
      <button hx-post="${ENDPOINT_TO_POPULATE_ALL_SECTIONS}" hx-include="#apikey" hx-target="${ELEMENT_CONTAINING_ALL_SECTIONS}" hx-swap="innerHTML" hx-indicator="#big-think"> Reload </button>
    </div>
    <script src="/jess.js"></script>
  </section>`;
}

export function parseAuthData(
  auth_data: string | undefined,
  requestPath: string
): HnyTricksAuthorization {
  const span = trace.getActiveSpan();
  span?.setAttributes({
    "app.input.auth_data.exists": !!auth_data,
  });
  if (!auth_data) {
    throw new HnyTricksAuthError(
      "auth_data not provided",
      `receiving ${requestPath}`
    );
  }
  const auth = JSON.parse(
    decodeURIComponent(auth_data)
  ) as HnyTricksAuthorization;
  span?.setAttributes(spanAttributesAboutAuth(auth));
  return auth;
}
