import { HnyTricksAuthorization } from "../src/common";
import { DatasetsTable, HnyTricksDataset } from "../src/Datasets";
import pretty from "pretty";

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
