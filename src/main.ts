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
} from "./Datasets";
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

app.post("/trace", async (req: Request, res: Response) => {
  trace.getActiveSpan().setAttributes({
    "noreally.request.body": "< " + JSON.stringify(req.body) + " >",
    "noreally.request.query": "< " + JSON.stringify(req.query) + " >",
    "noreally.request.params": "< " + JSON.stringify(req.params) + " >",
    "app.traceId": req.body["trace-id"],
    "app.apiKey.exists": !!req.body["apikey"],
  });
  res.send(await TraceActions(req.body.apikey, req.body["trace-id"]));
});

// TODO: this should be a get
app.post("/datasets", async (req: Request, res: Response) => {
  console.log("here we are at /datasets");
  const span = trace.getActiveSpan();
  // TODO: should we cache this? or pass all the data back and forth from the UI?
  const authResult: HnyTricksAuthorization | AuthError = await authorize(
    req.body.apikey
  ); // TODO: cache?
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

app.post("/datasets/delete", async (req: Request, res: Response) => {
  const { apikey, auth_data, ...formData } = req.body;

  const auth = parseAuthData(auth_data, req.path);

  const output = await deleteDatasets(auth, formData as DeleteDatasetInputs);
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
