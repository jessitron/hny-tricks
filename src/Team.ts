import { html } from "./htm-but-right";

export function Team(apiKey: string | undefined): string {
  return html`<div class="team">
    <form hx-post="/team" hx-target="#stuff">
        <label for="apikey">Honeycomb API Key:</label>
        <input id="apikey"></input>
        <button>Check Permissions</button>
    </form>
    <p class="fine-print">This API key will be sent to the Honeycomb Tricks backend, but we don't save it. We call the Honeycomb auth endpoint,
    and then tell you which team and environment it belongs to, and which permissions it has.
    </p> 
  </div>`;
}
