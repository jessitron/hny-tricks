import { HnyTricksAuthorization } from "./common";
import { html } from "./htm-but-right";

export function describeDatasets(auth: HnyTricksAuthorization): string {
  if (!auth.permissions.canManageDatasets) {
    return html`This API Key does not have the "Manage Datasets" permission.`;
  }
  return html`Datasets go here...`;
}
