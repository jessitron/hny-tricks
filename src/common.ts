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
  | "US"
  | "EU"
  | "dogfood EU"
  | "dogfood US"
  | "unknown"
  | "unknowable"; // configuration keys don't include region info in the key
export type EnvironmentType = "classic" | "e&s" | "none";
export type KeyInfo = {
  type: KeyType;
  environmentType: EnvironmentType;
  region: Region;
};

// @ts-ignore I don't want this to be complete, TypeScript. I do want all the keys to be regions.
export const HoneycombEndpointByRegion: Record<Region, string> = {
  EU: "https://api.eu1.honeycomb.io/1/",
  US: "https://api.honeycomb.io/1/",
  "dogfood EU": "https://api.dogfood.eu1.honeycomb.io/1/",
  "dogfood US": "https://api-dogfood.honeycomb.io/1/",
};

// @ts-ignore I don't want this to be complete, TypeScript. I do want all the keys to be regions.
export const HoneycombUIEndpointByRegion: Record<Region, string> = {
  EU: "https://ui.eu1.honeycomb.io/",
  US: "https://ui.honeycomb.io/",
  "dogfood EU": "https://ui.dogfood.eu1.honeycomb.io/",
  "dogfood US": "https://ui-dogfood.honeycomb.io/",
};
