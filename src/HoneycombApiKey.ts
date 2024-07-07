import { html } from "./htm-but-right";

export function Team(apiKey: string | undefined): string {
  return html`<div class="team">
    <form hx-post="/team" hx-target="#stuff" id="apikey-form">
        <label for="apikey">Honeycomb API Key:</label>
        <input id="apikey" name="apikey" hx-post="/validate" hx-target="#apikey-opinion" ></input>
        <button>Check Permissions</button>
        <span id="apikey-opinion"></span>
    </form>
    <p class="fine-print">This API key will be sent to the Honeycomb Tricks backend, but we don't save it. We call the Honeycomb auth endpoint,
    and then tell you which team and environment it belongs to, and which permissions it has.
    </p> 
  </div>`;
}

export function commentOnApiKey(apiKey: string): string {
  const keyInfo = interpretApiKey(apiKey);
  if (keyInfo.type === "ingest") {
    if (keyInfo.region !== "unknown") {
      return html`<span class="happy"
        >This looks like a ${keyInfo.region} ingest key</span
      >`;
    } else {
      return html`<span class="unhappy"
        >This looks like an ingest key, but I can't tell which region</span
      >`;
    }
  }
  return html`<span class="unhappy">That doesn't look like an API key</span>`;
}

type KeyType = "none" | "ingest";
type Region = "US" | "EU" | "dogfood" | "unknown";
export function interpretApiKey(apiKey: string): {
  type: KeyType;
  region: Region;
} {
  let keyType: KeyType = "none";
  let region: Region = "unknown";
  if (apiKey.length === 64 && apiKey.match(/^hc[abd]ik_[a-z0-9]{58}$/)) {
    keyType = "ingest";
    if (apiKey.startsWith("hcaik_")) {
      region = "US";
    } else if (apiKey.startsWith("hcbik_")) {
      region = "EU";
    } else if (apiKey.startsWith("hcdik_")) {
      region = "dogfood";
    }
  }
  return { type: keyType, region };
}
