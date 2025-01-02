import { HnyTricksAuthorization } from "../src/common";
import pretty from "pretty";
import { HnyTricksDataset } from "../src/datasets/dataset_common";
import { DatasetsTable } from "../src/datasets/DatasetsTable";
import { datasetSlugsToDelete } from "../src/datasets/deletion";

expect.addSnapshotSerializer({
  test: (val) => typeof val === "string",
  //@ts-ignore
  print: (val: string) => pretty(val, { ocd: true }), // this works fine
});

const fakeAuth: HnyTricksAuthorization = {
  apiKey: "deadf00t",
  apiKeyId: "what is this",
  keyInfo: {
    type: "configuration",
    environmentType: "e&s",
    region: "local test",
  },
  permissions: {
    canManageDatasets: false,
    canSendEvents: false,
    canManageColumns: false,
  },
  environment: {
    slug: "env_slug",
    name: "my environment",
  },
  team: {
    slug: "team_slug",
    name: "my team name",
  },
};

const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
const aYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
const fakeRecentDataset: HnyTricksDataset = {
  name: "API gateway",
  slug: "api-gateway",
  created: aYearAgo,
  last_written: twoDaysAgo,
};
const fakeExpiredDataset: HnyTricksDataset = {
  name: "ye olde proxy",
  slug: "olde-proxy",
  created: aYearAgo,
  last_written: aYearAgo,
};

describe("DatasetsTable", () => {
  it("outputs the same thing as before, for an empty one", () => {
    const html = DatasetsTable({ datasets: [], auth: fakeAuth });
    expect(html).toMatchSnapshot();
  });
  it("Renders datasets, the same as before", () => {
    const html = DatasetsTable({
      datasets: [fakeRecentDataset, fakeExpiredDataset],
      auth: fakeAuth,
    });
    expect(html).toMatchSnapshot();
  });
});

describe("deleting datasets", () => {
  it("parses the input", () => {
    const input = {
      "dataset-slug-0": "hny-tricks-nodejs",
      "dataset-slug-1": "hny-otel-web-test",
      "dataset-slug-2": "hny-tricks-web",
      "dataset-slug-3": "backend-for-frontend",
      "delete-dataset-3": "on",
      "dataset-slug-4": "unknown_metrics",
      "dataset-slug-5": "phrase-picker-java",
      "dataset-slug-6": "image-picker-java",
      "dataset-slug-7": "meminator-java",
      "dataset-slug-8": "unknown_service",
      "dataset-slug-9": "website",
    };

    const output = datasetSlugsToDelete(input);
    expect(output).toStrictEqual(["backend-for-frontend"]);
  });
});
