import { AVAILABLE_EVENTS } from "../src/event/send";
import {
  customEventBit,
  EventSelection,
  onePresetEvent,
  presetEventsBit,
} from "../src/event/SendEvent";

describe("EventSelection", () => {
  it("renders the event selection form", () => {
    const result = EventSelection({ availableEvents: AVAILABLE_EVENTS });
    expect(result).not.toContain("Invalid HTML detected");
    expect(result).toMatchSnapshot();
  });
});

describe("customEventBit", () => {
  it("renders", () => {
    const result = customEventBit();
    expect(result).not.toContain("Invalid HTML detected");
    expect(result).toMatchSnapshot();
  });
});

describe("presetEventsBit", () => {
  it("renders", () => {
    const result = presetEventsBit({ availableEvents: AVAILABLE_EVENTS });
    expect(result).not.toContain("Invalid HTML detected");
    expect(result).toMatchSnapshot();
  });
});

describe("onePresetEvent", () => {
  it("renders", () => {
    const result = onePresetEvent("event1", AVAILABLE_EVENTS.event1);
    expect(result).not.toContain("Invalid HTML detected");
    expect(result).toMatchSnapshot();
  });
});
