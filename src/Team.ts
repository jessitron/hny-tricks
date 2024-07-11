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
    <h4>Region: ${keyInfo.region}</h4>
    <h3>Team: ${permissions.team.name}</h3>
    <h4>Environment: ${permissions.environment.name || "Classic"}</h4>
    <a href=${envLink}> ${envLink} </a>
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
