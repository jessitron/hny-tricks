import { HnyTricksAuthorization } from "../src/common";
import { DatasetsTable } from "../src/Datasets";
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

describe("DatasetsTable", () => {
  it("outputs the same thing as before", () => {
    const html = DatasetsTable({ datasets: [], auth: fakeAuth });
    expect(html).toMatchSnapshot();
  });
});
