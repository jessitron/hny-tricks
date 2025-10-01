import { Html, html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";

export function ApiKeyInputs(): Html {
  return html`<div data-traceid="${currentTraceId()}">
    <section id="from-apikey-section" class="apiKey">
      <h2>From Environment</h2>
      <form id="from-apikey-form">
        <div>
          <label for="from-apikey"
            >Honeycomb API Key
            <a
              href="https://docs.honeycomb.io/get-started/configure/environments/manage-api-keys/"
              target="_blank"
            >
              ❔ </a
            ><span id="reveal-from-password" tron-reveal="#from-apikey">👁</span></label
          >
          <input
            id="from-apikey"
            type="password"
            name="from-apikey"
            hx-trigger="input changed throttle:200ms"
            hx-post="/copy-board/validate-from"
            hx-target="#from-apikey-status"
            hx-include="#from-apikey"
            hx-swap="innerHTML"
            hx-indicator="#big-think"
          />
        </div>
        <div id="from-apikey-status"></div>
      </form>
    </section>

    <section id="to-apikey-section" class="apiKey">
      <h2>To Environment</h2>
      <form id="to-apikey-form">
        <div>
          <label for="to-apikey"
            >Honeycomb API Key
            <a
              href="https://docs.honeycomb.io/get-started/configure/environments/manage-api-keys/"
              target="_blank"
            >
              ❔ </a
            ><span id="reveal-to-password" tron-reveal="#to-apikey">👁</span></label
          >
          <input
            id="to-apikey"
            type="password"
            name="to-apikey"
            hx-trigger="input changed throttle:200ms"
            hx-post="/copy-board/validate-to"
            hx-target="#to-apikey-status"
            hx-include="#to-apikey"
            hx-swap="innerHTML"
            hx-indicator="#big-think"
          />
        </div>
        <div id="to-apikey-status"></div>
      </form>
    </section>
    <script src="/jess.js"></script>
  </div>`;
}
