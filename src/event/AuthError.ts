import { html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";

export class HnyTricksAuthError extends Error {
  constructor(public message: string, public contextMessage: string) {
    super(message);
    this.name = "HnyTricksAuthError";
  }
}

export function isHnyTricksAuthError(
  error: Error
): error is HnyTricksAuthError {
  return error.name === "HnyTricksAuthError";
}

export function HnyTricksAuthErrorMessage(params: {
  error: HnyTricksAuthError;
}) {
  const { error } = params;
  return html`
    <div traceId=${currentTraceId()}>
      <p>Problem with Authorization.</p>
      <p>Message: ${error.message}</p>
      <p>Context: ${error.contextMessage}</p>
    </div>
  `;
}
