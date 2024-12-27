import { trace } from "@opentelemetry/api";
import { authorize, isAuthError, startingApiKeyPrompt } from "./ApiKeyPrompt";
import { TraceSection } from "./TraceSection";
import {
  constructEnvironmentLink,
  HnyTricksAuthorization,
  HoneycombUIEndpointByRegion,
  spanAttributesAboutAuth,
} from "./common";
import { html } from "./htm-but-right";

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
  return teamDescription(authResult) + traceSection + datasetSection;
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
            }"></input>
            <button onclick="window.location = window.location"> Reset </button>
        <button hx-post="/team" hx-target="team-section" hx-swap="outerHTML" hx-indicator="#big-think">Reload</button>
      </div>
    </form>
    </div>
    <div class="team-description team-region">Region: ${
      auth.keyInfo.region
    }</div>
    <div class="team-description team-name">Team: ${auth.team.name}</div>
    <div class="team-description team-env">
      Environment: ${auth.environment.name || "Classic"}
    </div>
    <div class="team-link"><a href=${envLink}> ${envLink} </a></div>
    <script src="/jess.js"></script>
  </section>`;
}
