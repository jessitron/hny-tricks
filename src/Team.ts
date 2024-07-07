import { html } from "./htm-but-right";

export function teamDescription({ keyInfo, permissions }) {
  return html`<div class="team">
    <h2>Team: ${permissions.team.name}</h2>
    <h2>Environment: ${permissions.environment.name || "Classic"}</h2>
    <a href=${constructEnvironmentLink(keyInfo, permissions)}>
      Link to Environment
    </a>
  </div>`;
}

function constructEnvironmentLink(keyInfo: any, permissions: any): any {
  // TODO: handle classic and get the endpoint right
  const envSlug = permissions.environment.slug || "$legacy$"; // Classic environment doesn't have a slug
  return (
    "https://ui.honeycomb.io/" +
    permissions.team.slug +
    "/environments/" +
    envSlug +
    "/"
  );
}
