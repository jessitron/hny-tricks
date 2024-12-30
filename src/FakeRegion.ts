// This is where we pretend to be a Honeycomb for certain test api keys

import { HoneycombAuthResponse } from "./common";
import { Request, Response } from "express";

const FAKE_CONFIGURATION_KEY = "realConfigurationKeyYo";

const fakeTeams: Record<string, HoneycombAuthResponse> = {
  [FAKE_CONFIGURATION_KEY]: {
    id: "hi",
    type: "configuration",
    team: { slug: "teamity-team", name: "Teamity Team" },
    environment: { slug: "envity-env", name: "Savannah" },
    api_key_access: {
      events: true,
      markers: true,
      createDatasets: true,
      triggers: false,
      boards: false,
      queries: false,
      columns: false,
      slos: false,
      recipients: false,
      privateBoards: false,
    },
  },
};

export function getAuthResult(apikey: string) {
  return fakeTeams[apikey];
}

export const fakeAuthEndpoint = async (req: Request, res: Response) => {
  const apikey = req.headers["x-honeycomb-team"]; // i think express lowercases them
  const fakeAuthResult = getAuthResult(apikey);
  if (!!fakeAuthResult) {
    res.send(fakeAuthResult);
  } else {
    res.status(401);
    res.send("That is not one of our fake test teams, gj");
  }
};
