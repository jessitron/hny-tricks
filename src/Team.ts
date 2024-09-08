import { HnyTricksAuthorization, HoneycombUIEndpointByRegion } from "./common";
import { html } from "./htm-but-right";

export function teamDescription(auth: HnyTricksAuthorization) {
  const envLink = constructEnvironmentLink(auth);
  return html`<section class="team">
    <div class="team-description team-apikey">
        <label for="apikey">Honeycomb API Key: <span id="reveal-password" tron-reveal="#apikey">👁</span></label>
            <input id="apikey" type="password" name="apikey" disabled="true" value="${
              auth.apiKey
            }" ></input>
            <button>Reset</button>
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
