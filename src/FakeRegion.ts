// This is where we pretend to be a Honeycomb for certain test api keys

import { HoneycombAuthResponse } from "./common";

const FAKE_CONFIGURATION_KEY = "realConfigurationKeyYo";

const fakeTeams: Record<string, HoneycombAuthResponse> = {


}

export function getAuthResult(apikey: string) {
    return fakeTeams[apikey];
}