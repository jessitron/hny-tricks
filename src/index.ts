import "./tracing";
import express, { Request, Response } from "express";
import { html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import {
  authorize,
  commentOnApiKey,
  ApiKeyPrompt,
  isAuthError,
} from "./HoneycombApiKey";
import bodyParser from "body-parser";
import { teamDescription } from "./Team";
import { describeDatasets } from "./Datasets";
import { spanAttributesAboutAuth } from "./common";

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

  var result = teamDescription(authResult) + describeDatasets(authResult);
  res.send(result);
});

// used in the ApiKeyPrompt
app.get("/validate", (req: Request, res: Response) => {
  console.log("here we are at /validate oy");
  trace.getActiveSpan()?.setAttributes({
    dammit: "work",
    "noreally.request.body": "<" + JSON.stringify(req.body) + ">",
    "noreally.request.query": "<" + JSON.stringify(req.query) + ">",
    "noreally.request.params": "<" + JSON.stringify(req.params) + ">",
  });
  res.send(commentOnApiKey(req.query.apikey));
});

const javascriptToStartTracing = `
   Hny.initializeTracing({  apiKey: "${process.env.HONEYCOMB_INGEST_API_KEY}",
          serviceName: "hny-tricks-web",
          debug: true,
        });
`;

const SneakyFooter = () =>
  html`<footer>
    <img id="bug" src="./bug-thinks-nuggs.jpg" />
  </footer>`;
