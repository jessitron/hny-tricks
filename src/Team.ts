import {
  HoneycombAuthResponse,
  HoneycombEndpointByRegion,
  HoneycombUIEndpointByRegion,
  KeyInfo,
} from "./common";
import { html } from "./htm-but-right";

export function teamDescription({ keyInfo, permissions }) {
  const envLink = constructEnvironmentLink(keyInfo, permissions);
  return html`<section class="team">
    <div class="team-description team-region">Region: ${keyInfo.region}</div>
    <div class="team-description team-name">Team: ${permissions.team.name}</div>
    <div class="team-description team-env">
      Environment: ${permissions.environment.name || "Classic"}
    </div>
    <div class="team-link"><a href=${envLink}> ${envLink} </a></div>
  </section>`;
}

function constructEnvironmentLink(
  keyInfo: KeyInfo,
  permissions: HoneycombAuthResponse
): any {
  // TODO: handle classic and get the endpoint right
  const envSlug = permissions.environment.slug || "$legacy$"; // Classic environment doesn't have a slug
  return (
    HoneycombUIEndpointByRegion[keyInfo.region] +
    permissions.team.slug +
    "/environments/" +
    envSlug +
    "/"
  );
}
