import {
  HnyTricksAuthorization,
  HoneycombAuthResponse,
  HoneycombEndpointByRegion,
  HoneycombUIEndpointByRegion,
  KeyInfo,
} from "./common";
import { html } from "./htm-but-right";

export function teamDescription(auth: HnyTricksAuthorization) {
  const envLink = constructEnvironmentLink(auth);
  return html`<section class="team">
    <div class="team-description team-region">Region: ${auth.keyInfo.region}</div>
    <div class="team-description team-name">Team: ${auth.team.name}</div>
    <div class="team-description team-env">
      Environment: ${auth.environment.name || "Classic"}
    </div>
    <div class="team-link"><a href=${envLink}> ${envLink} </a></div>
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
