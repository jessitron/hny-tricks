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
import { parseAuthData, team } from "./Team";
import { index } from "./index";
import { copyBoardPage } from "./copyBoard";
import { validateApiKey } from "./copy-board/validateKey";
import { listBoards } from "./copy-board/listBoards";
import { analyzeBoard } from "./copy-board/analyzeBoard";
import { authorize } from "./ApiKeyPrompt";
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
import { commentOnApiKey } from "./auth/validate";

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

app.get("/copy-board", (req, res) => {
  console.log("here we are at /copy-board");
  const fullResponse = `<!DOCTYPE html>${copyBoardPage()}`;
  report({ "response.body": fullResponse });
  res.send(fullResponse);
});

app.post("/copy-board/validate-from", async (req: Request, res: Response) => {
  const apiKey = req.body["from-apikey"];
  const output = await validateApiKey(apiKey, true);
  res.send(normalizeHtml(output));
});

app.post("/copy-board/validate-to", async (req: Request, res: Response) => {
  const apiKey = req.body["to-apikey"];
  const output = await validateApiKey(apiKey, false);
  res.send(normalizeHtml(output));
});

app.get("/copy-board/list-boards", async (req: Request, res: Response) => {
  const apiKey = req.query["from-apikey"] as string;
  const auth = await authorize(apiKey);
  if ("html" in auth) {
    res.send(normalizeHtml(auth.html));
    return;
  }
  const output = await listBoards(auth);
  res.send(normalizeHtml(output));
});

app.post("/copy-board/analyze-board", async (req: Request, res: Response) => {
  const boardId = req.body["board-id"];
  const apiKey = req.body["from-apikey"];

  const auth = await authorize(apiKey);
  if ("html" in auth) {
    res.send(normalizeHtml(auth.html));
    return;
  }

  const output = await analyzeBoard(auth, boardId);
  res.send(normalizeHtml(output));
});

app.post("/team", async (req: Request, res: Response) => {
  res.send(normalizeHtml(await team(req.body.apikey)));
});

app.post("/validate", (req: Request, res: Response) => {
  const apiKeyInterpretation = normalizeHtml(commentOnApiKey(req.body.apikey));
  report({ "response.body": apiKeyInterpretation });
  res.send(apiKeyInterpretation);
});

app.post("/trace", (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  report({ "app.traceId": formData["trace-id"] });
  res.send(normalizeHtml(traceActions(auth, formData["trace-id"])));
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
