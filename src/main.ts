import "./tracing";
import express, { Request, Response } from "express";
import { html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import {
  authorize,
  commentOnApiKey,
  isAuthError,
  startingApiKeyPrompt,
} from "./ApiKeyPrompt";
import bodyParser from "body-parser";
import { team, teamDescription } from "./Team";
import { describeDatasets } from "./Datasets";
import { spanAttributesAboutAuth } from "./common";
import { fakeAuthEndpoint, getAuthResult } from "./FakeRegion";
import { report } from "./tracing-util";
import { index } from "./index";

const app = express();
const port = process.env.PORT || 3000;

// serve files from the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/", (req, res) => {
  console.log("here we are at /");
  const fullResponse = `<!DOCTYPE html>${index()}`;
  trace.getActiveSpan()?.setAttribute("response.body", fullResponse);
  res.send(fullResponse);
});

app.post("/team", async (req: Request, res: Response) => {
  console.log("here we are at /team");
  res.send(await team(req.body.apikey));
});

// used in the ApiKeyPrompt
app.post("/validate", (req: Request, res: Response) => {
  console.log("here we are at /validate oy");
  report({
    dammit: "work",
    "noreally.request.body": "< " + JSON.stringify(req.body) + " >",
    "noreally.request.query": "< " + JSON.stringify(req.query) + " >",
    "noreally.request.params": "< " + JSON.stringify(req.params) + " >",
  });
  const apiKeyInterpretation = commentOnApiKey(req.body.apikey);
  report({ "app.response": apiKeyInterpretation });
  res.send(apiKeyInterpretation);
});

app.post("/datasets", async (req: Request, res: Response) => {
  console.log("here we are at /datasets");
  const span = trace.getActiveSpan();
  // TODO: should we cache this? or pass all the data back and forth from the UI?
  const authResult = await authorize(req.body.apikey); // TODO: cache?
  if (isAuthError(authResult)) {
    span?.setAttributes({ "hny.authError": authResult.html });
    span?.setStatus({ code: 2, message: "auth failed" });
    res.send(authResult.html);
    return;
  }
  span?.setAttributes(spanAttributesAboutAuth(authResult));

  const output = await describeDatasets(authResult);
  res.send(output);
});

app.get("/test-region/api/auth", fakeAuthEndpoint);
