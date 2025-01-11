import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

// todo: move to status.ts
export class StatusUpdate {
  success: boolean;
  html: string;
}

export function statusDiv(status: StatusUpdate) {
  return html`<div
    data-traceid=${currentTraceId()}
    class="status ${status.success ? "happy" : "unhappy"}"
  >
    ${status.html}
  </div>`;
}
