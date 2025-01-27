import "./tracing";

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { report } from "./tracing-util";
import { normalizeHtml } from "./htm-but-right";
import {
  HnyTricksAuthErrorMessage,
  isHnyTricksAuthError,
} from "./event/AuthError";

import { fakeAuthEndpoint } from "./FakeRegion";
import { commentOnApiKey } from "./ApiKeyPrompt";
import { parseAuthData, team } from "./Team";
import { index } from "./index";
import { traceActions } from "./TraceSection";
import {
  createDerivedColumns,
  derivedColumnExists,
} from "./datasets/derivedColumns";
import { DeleteDatasetInputs, deleteDatasets } from "./datasets/deletion";
import { describeDatasets } from "./datasets/datasets";
import { sendEventSection } from "./event/SendEvent";
import { statusDiv } from "./status";
import { sendEvent } from "./event/send";

const app = express();
const port = process.env.PORT || 3000;

// serve files from the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  if (isHnyTricksAuthError(err)) {
    res.status(400).send(HnyTricksAuthErrorMessage({ error: err }));
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/", (req, res) => {
  console.log("here we are at /");
  const fullResponse = `<!DOCTYPE html>${index()}`;
  report({ "response.body": fullResponse });
  res.send(fullResponse);
});

app.post("/team", async (req: Request, res: Response) => {
  res.send(normalizeHtml(await team(req.body.apikey)));
});

app.post("/validate", (req: Request, res: Response) => {
  const apiKeyInterpretation = commentOnApiKey(req.body.apikey);
  report({ "app.response": normalizeHtml(apiKeyInterpretation) });
  res.send(normalizeHtml(apiKeyInterpretation));
});

app.post("/trace", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  report({ "app.traceId": formData["trace-id"] });
  res.send(normalizeHtml(await traceActions(auth, formData["trace-id"])));
});

app.post("/datasets", async (req: Request, res: Response) => {
  const { auth_data } = req.body;
  const auth = parseAuthData(auth_data, req.path);

  const output = await describeDatasets(auth);
  res.send(normalizeHtml(output));
});

app.post("/datasets/delete", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const status = await deleteDatasets(auth, formData as DeleteDatasetInputs);

  const output = await describeDatasets(auth, statusDiv(status));
  res.send(normalizeHtml(output));
});

app.post("/datasets/dc/exists", async (req: Request, res: Response) => {
  const { apikey, auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const output = await derivedColumnExists(auth, req.query);
  report({
    "app.hx-trigger": JSON.stringify(output.hx_trigger),
  });
  if (!!output.hx_trigger) {
    res.header("Hx-Trigger", JSON.stringify(output.hx_trigger));
  }
  res.send(normalizeHtml(output.html));
});

app.post("/datasets/dc/create-all", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const alias = req.query["alias"];

  const status = await createDerivedColumns(
    auth,
    alias,
    formData as DeleteDatasetInputs
  );

  const output = await describeDatasets(auth, statusDiv(status));
  res.send(normalizeHtml(output));
});

app.post("/datasets/dc/create-all", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const alias = req.query["alias"];

  const status = await createDerivedColumns(
    auth,
    alias,
    formData as DeleteDatasetInputs
  );

  const output = await describeDatasets(auth, statusDiv(status));
  res.send(normalizeHtml(output));
});

app.post("/event/send", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const status = await sendEvent(auth, formData);

  const output = sendEventSection(auth, formData, statusDiv(status));
  res.send(normalizeHtml(output));
});

app.get("/test-region/api/auth", fakeAuthEndpoint);

console.log("end of file");
