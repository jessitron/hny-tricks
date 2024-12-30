import { trace } from "@opentelemetry/api";
import {
  authorize,
  ELEMENT_CONTAINING_ALL_SECTIONS,
  ENDPOINT_TO_POPULATE_ALL_SECTIONS,
  isAuthError,
  startingApiKeyPrompt,
} from "./ApiKeyPrompt";
import { TraceSection } from "./TraceSection";
import {
  constructEnvironmentLink,
  HnyTricksAuthorization,
  HoneycombUIEndpointByRegion,
  spanAttributesAboutAuth,
} from "./common";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

/**
 * why is this file capitalized?
 * it represents responses to the /team html call.
 */

export async function team(apikey) {
  const span = trace.getActiveSpan();
  if (!apikey) {
    span.setAttribute("warning", "no api key received");
    return startingApiKeyPrompt;
  }
  const authResult = await authorize(apikey);
  if (isAuthError(authResult)) {
    span?.setAttributes({ "hny.authError": authResult.html });
    span?.setStatus({ code: 2, message: "auth failed" });
    return authResult.html;
  }
  span?.setAttributes(spanAttributesAboutAuth(authResult));

  const traceSection = TraceSection(authResult);

  const datasetSection = html`<section
    name="dataset-section"
    id="dataset-section"
    hx-trigger="load"
    hx-post="/datasets"
    hx-include="#apikey"
  >
    Loading datasets...
  </section>`;
  return html`<div data-traceid=${currentTraceId()}>
    ${teamDescription(authResult)} ${traceSection} ${datasetSection}
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
            <input class="invisible" id="auth-response" name="auth-response" value=${JSON.stringify(
              auth
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
    <div class="team-link"><a href=${envLink}> ${envLink} </a>   
      <button hx-post="${ENDPOINT_TO_POPULATE_ALL_SECTIONS}" hx-include="#apikey" hx-target="${ELEMENT_CONTAINING_ALL_SECTIONS}" hx-swap="innerHTML" hx-indicator="#big-think"> Reload </button>
    </div>
    <script src="/jess.js"></script>
  </section>`;
}
