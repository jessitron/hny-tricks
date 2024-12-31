import "./tracing";
import express, { Request, Response } from "express";
import { trace } from "@opentelemetry/api";
import {
  AuthError,
  authorize,
  commentOnApiKey,
  isAuthError,
} from "./ApiKeyPrompt";
import bodyParser from "body-parser";
import { team } from "./Team";
import {
  DeleteDatasetInputs,
  deleteDatasets,
  describeDatasets,
} from "./datasets/Datasets";
import {
  HnyTricksAuthError,
  HnyTricksAuthorization,
  spanAttributesAboutAuth,
} from "./common";
import { fakeAuthEndpoint } from "./FakeRegion";
import { currentTraceId, report } from "./tracing-util";
import { index } from "./index";
import { TraceActions } from "./TraceSection";
import { html } from "./htm-but-right";
import { derivedColumnExists } from "./datasets/derivedColumns";

const app = express();
const port = process.env.PORT || 3000;

// serve files from the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof HnyTricksAuthError) {
    res.status(400).send(html`
      <div traceId=${currentTraceId()}>
        <p>Problem with Authorization.</p>
        <p>Message: ${err.message}</p>
        <p>Context: ${err.contextMessage}</p>
      </div>
    `);
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
  const span = trace.getActiveSpan();
  span?.setAttribute("response.body", fullResponse);
  res.send(fullResponse);
});

app.post("/team", async (req: Request, res: Response) => {
  res.send(await team(req.body.apikey));
});

// used in the ApiKeyPrompt
app.post("/validate", (req: Request, res: Response) => {
  const apiKeyInterpretation = commentOnApiKey(req.body.apikey);
  report({ "app.response": apiKeyInterpretation });
  res.send(apiKeyInterpretation);
});

app.post("/trace", async (req: Request, res: Response) => {
  const { auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  trace.getActiveSpan().setAttributes({
    "app.traceId": formData["trace-id"],
  });
  res.send(await TraceActions(auth, formData["trace-id"]));
});

app.post("/datasets", async (req: Request, res: Response) => {
  const { auth_data } = req.body;
  const auth = parseAuthData(auth_data, req.path);

  const output = await describeDatasets(auth);
  res.send(output);
});

app.post("/datasets/delete", async (req: Request, res: Response) => {
  const { apikey, auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const output = await deleteDatasets(auth, formData as DeleteDatasetInputs);
  res.send(output);
});

app.post("/datasets/dc/exists", async (req: Request, res: Response) => {
  const { apikey, auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const output = await derivedColumnExists(
    auth,
    req.query["slug"],
    req.query["alias"]
  );
  res.send(output);
});

function parseAuthData(
  auth_data: string | undefined,
  requestPath: string
): HnyTricksAuthorization {
  const span = trace.getActiveSpan();
  span?.setAttributes({
    "app.input.auth_data.exists": !!auth_data,
  });
  if (!auth_data) {
    throw new HnyTricksAuthError(
      "auth_data not provided",
      `receiving ${requestPath}`
    );
  }
  const auth = JSON.parse(
    decodeURIComponent(auth_data)
  ) as HnyTricksAuthorization;
  span?.setAttributes(spanAttributesAboutAuth(auth));
  return auth;
}

app.get("/test-region/api/auth", fakeAuthEndpoint);
