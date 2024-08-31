export type HoneycombAuthResponse = {
  id: string;
  type: "configuration" | "ingest";
  api_key_access: {
    events: boolean;
    markers: boolean;
    triggers: boolean;
    boards: boolean;
    queries: boolean;
    columns: boolean;
    createDatasets: boolean;
    slos: boolean;
    recipients: boolean;
    privateBoards: boolean;
  };
  environment: {
    name: string;
    slug: string;
  };
  team: {
    name: string;
    slug: string;
  };
};

export type KeyType = "none" | "ingest" | "configuration";
export type Region =
  | "local test"
  | "US"
  | "EU"
  | "dogfood EU"
  | "dogfood US"
  | "kibble EU"
  | "kibble US"
  | "unknown"
  | "unknowable"; // configuration keys don't include region info in the key
export type EnvironmentType = "classic" | "e&s" | "none";
export type KeyInfo = {
  type: KeyType;
  environmentType: EnvironmentType;
  region: Region;
};

// @ts-ignore I don't want this to be complete, TypeScript. I do want all the keys to be regions.
export const HoneycombApiEndpointByRegion: Record<Region, string> = {
  "local test": "/test-region/ui",
  EU: "https://api.eu1.honeycomb.io/1/",
  US: "https://api.honeycomb.io/1/",
  "dogfood EU": "https://api.dogfood.eu1.honeycomb.io/1/",
  "dogfood US": "https://api-dogfood.honeycomb.io/1/",
  "kibble EU": "https://api.kibble.eu1.honeycomb.io/1/",
  "kibble US": "https://api-kibble.honeycomb.io/1/",
};

// @ts-ignore I don't want this to be complete, TypeScript. I do want all the keys to be regions.
export const HoneycombUIEndpointByRegion: Record<Region, string> = {
  "local test": "/test-region/api",
  EU: "https://ui.eu1.honeycomb.io/",
  US: "https://ui.honeycomb.io/",
  "dogfood EU": "https://ui.dogfood.eu1.honeycomb.io/",
  "dogfood US": "https://ui-dogfood.honeycomb.io/",
  "kibble EU": "https://ui.kibble.eu1.honeycomb.io/",
  "kibble US": "https://ui-kibble.honeycomb.io/",
};

export type HnyTricksAuthorization = {
  apiKey: string;
  apiKeyId: string;
  keyInfo: KeyInfo;
  permissions: { canManageDatasets: boolean };
  environment: { slug: string; name: string };
  team: { slug: string; name: string };
};

export function describeAuthorization(
  apiKey: string,
  keyInfo: KeyInfo,
  hnyAuthResponse: HoneycombAuthResponse
): HnyTricksAuthorization {
  return {
    apiKey, // don't log this
    apiKeyId: hnyAuthResponse.id, // this is safe to print
    keyInfo,
    permissions: {
      canManageDatasets: hnyAuthResponse.api_key_access.createDatasets,
    },
    environment: hnyAuthResponse.environment,
    team: hnyAuthResponse.team,
  };
}
export function spanAttributesAboutAuth(auth: HnyTricksAuthorization) {
  return {
    "honeycomb.key.type": auth.keyInfo.type,
    "honeycomb.key.region": auth.keyInfo.region,
    "honeycomb.key.environmentType": auth.keyInfo.environmentType,
    "honeycomb.key.id": auth.apiKeyId,
    "honeycomb.environment": auth.environment.slug,
    "honeycomb.team": auth.team.slug,
  };
}