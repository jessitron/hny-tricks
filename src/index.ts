import "./tracing";
import express, { Request, Response } from "express";
import { html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import {
  authorize,
  commentOnApiKey,
  ApiKeyPrompt,
  isAuthError,
} from "./ApiKeyPrompt";
import bodyParser from "body-parser";
import { teamDescription } from "./Team";
import { describeDatasets } from "./Datasets";
import { spanAttributesAboutAuth } from "./common";
import { getAuthResult } from "./FakeRegion";
import { report } from "./tracing-util";

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
  // well, I found the trick to get it to set the script body in the script :-/
  const element = html`<html>
    <head>
      <script src="/hny.js"></script>
      <script
        dangerouslySetInnerHTML=${{ __html: javascriptToStartTracing }}
      ></script>
      <script src="/htmx.js"></script>
      <title>Hny Tricks</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <h1>Jessitron's Honeycomb Tricks</h1>
      <${ApiKeyPrompt}
        destinationElement="#stuff"
        endpointToPopulateItWith="/team"
        endpointForApiKeyValidation="/validate"
      />
      <div id="stuff"></div>
      <div id="big-think" class="htmx-indicator"><img src="./spin.gif" /></div>
      <${SneakyFooter} />
    </body>
  </html>`;
  const fullResponse = `<!DOCTYPE html>${element}`;
  trace.getActiveSpan()?.setAttribute("response.body", fullResponse);
  res.send(fullResponse);
});

app.post("/team", async (req: Request, res: Response) => {
  console.log("here we are at /team");
  const span = trace.getActiveSpan();
  const authResult = await authorize(req.body.apikey);
  if (isAuthError(authResult)) {
    span?.setAttributes({ "hny.authError": authResult.html });
    span?.setStatus({ code: 2, message: "auth failed" });
    res.send(authResult.html);
    return;
  }
  span?.setAttributes(spanAttributesAboutAuth(authResult));

  const datasetSection = html`<section
    hx-trigger="load"
    hx-post="/datasets"
    hx-include="#apikey"
  >
    Loading datasets...
  </section>`;
  var result = teamDescription(authResult) + datasetSection;
  res.send(result);
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

app.get("/test-region/api/auth", async (req: Request, res: Response) => {
  const fakeAuthResult = getAuthResult(req.body.apikey);
  if (!!fakeAuthResult) {
    res.send(fakeAuthResult);
  } else {
    res.setStatus(401);
    res.send("That is not one of our fake test teams, gj");
  }
});

const javascriptToStartTracing = `
   Hny.initializeTracing({  apiKey: "${
     process.env.HONEYCOMB_INGEST_API_KEY || process.env.HONEYCOMB_API_KEY
   }",
          serviceName: "hny-tricks-web",
          debug: true,
        });
`;

const SneakyFooter = () =>
  html`<footer>
    <img id="bug" src="./bug-thinks-nuggs.jpg" />
  </footer>`;
