import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "./common";
import { fetchFromHoneycombApi } from "./HoneycombApi";
import { html } from "./htm-but-right";

export async function describeDatasets(
  auth: HnyTricksAuthorization
): Promise<string> {
  const span = trace.getActiveSpan();
  span?.setAttribute(
    "app.datasets.canManageDatasets",
    auth.permissions.canManageDatasets
  );
  if (!auth.permissions.canManageDatasets) {
    return html`This API Key does not have the "Manage Datasets" permission.`;
  }
  const datasets = await retrieveDatasets(auth);
  return html`Datasets go here...`;
}

async function retrieveDatasets(auth: HnyTricksAuthorization) {
  const result = await fetchFromHoneycombApi(auth, "/datasets");
}
