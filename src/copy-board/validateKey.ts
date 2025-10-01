import { Html, html } from "../htm-but-right";
import { HnyTricksAuthorization, constructEnvironmentLink } from "../common";
import { authorize, isAuthError } from "../ApiKeyPrompt";
import { currentTraceId } from "../tracing-util";

export async function validateApiKey(apiKey: string): Promise<Html> {
  if (!apiKey) {
    return html`<div></div>`;
  }

  const auth = await authorize(apiKey);
  if (isAuthError(auth)) {
    return auth.html;
  }

  return showEnvironmentInfo(auth);
}

function showEnvironmentInfo(auth: HnyTricksAuthorization): Html {
  const envLink = constructEnvironmentLink(auth);
  const hasBoards = auth.permissions.canManageDatasets; // boards permission is part of dataset management for config keys

  return html`<div class="team-description" data-traceid="${currentTraceId()}">
    <div class="team-description team-region">✅ Region: ${auth.keyInfo.region}</div>
    <div class="team-description team-name">✅ Team: ${auth.team.name}</div>
    <div class="team-description team-env">
      ✅ Environment: ${auth.environment.name || "Classic"}
    </div>
    <div class="team-link">
      <a href=${envLink} target="_blank"> ${envLink} </a>
    </div>
    ${boardPermissionStatus(auth)}
  </div>`;
}

function boardPermissionStatus(auth: HnyTricksAuthorization): Html {
  // Check if this is a configuration key with board management permissions
  const canManageBoards =
    auth.keyInfo.type === "configuration" &&
    auth.permissions.canManageDatasets;

  if (canManageBoards) {
    return html`<div class="happy">✅ Can manage boards</div>`;
  } else if (auth.keyInfo.type === "ingest") {
    return html`<div class="unhappy">
      ⚠️ This is an ingest key. You need a configuration key with board management
      permissions.
    </div>`;
  } else {
    return html`<div class="unhappy">
      ⚠️ This key does not have board management permissions.
    </div>`;
  }
}
