import { trace } from "@opentelemetry/api";
import { authorize, isAuthError, startingApiKeyPrompt } from "./ApiKeyPrompt";
import {
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

  const datasetSection = html`<section
    hx-trigger="load"
    hx-post="/datasets"
    hx-include="#apikey"
  >
    Loading datasets...
  </section>`;
  return teamDescription(authResult) + datasetSection;
}

export function teamDescription(auth: HnyTricksAuthorization) {
  const envLink = constructEnvironmentLink(auth);
  return html`<section class="team">
    <div class="team-description team-apikey">
        <label for="apikey">Honeycomb API Key: <span id="reveal-password" tron-reveal="#apikey">👁</span></label>
            <input id="apikey" type="password" name="apikey" disabled="true" value="${
              auth.apiKey
            }" ></input>
            <button onclick="window.location = window.location" >Reset</button>
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

function constructEnvironmentLink(auth: HnyTricksAuthorization): any {
  // TODO: handle classic and get the endpoint right
  const envSlug = auth.environment.slug || "$legacy$"; // Classic environment doesn't have a slug
  return (
    HoneycombUIEndpointByRegion[auth.keyInfo.region] +
    auth.team.slug +
    "/environments/" +
    envSlug +
    "/"
  );
}
