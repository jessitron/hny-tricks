import "./tracing";
import express, { Request, Response } from "express";
import { html } from "./htm-but-right";
import { trace } from "@opentelemetry/api";
import { Team as HoneycombApiKey } from "./HoneycombApiKey";
import bodyParser from "body-parser";

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
      <script src="https://unpkg.com/@jessitronica/hny-otel-web@0.2.0/dist/hny.js"></script>
      <script
        dangerouslySetInnerHTML=${{ __html: javascriptToStartTracing }}
      ></script>
      <script src="/htmx.js"></script>
      <title>Hny Tricks</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <h1>Jessitron's Honeycomb Tricks</h1>
      <${HoneycombApiKey} />
      <div id="stuff"></div>
    </body>
  </html>`;
  const fullResponse = `<!DOCTYPE html>${element}`;
  trace.getActiveSpan()?.setAttribute("response.body", fullResponse);
  res.send(fullResponse);
});

app.post("/team", (req: Request, res: Response) => {
  console.log("here we are at /team");
  res.send("ok");
});

app.post("/validate", (req: Request, res: Response) => {
  console.log("here we are at /validate oy");
  trace.getActiveSpan()?.setAttributes({
    dammit: "work",
    "noreally.request.body": "<" + JSON.stringify(req.body) + ">",
    "noreally.request.query": "<" + JSON.stringify(req.query) + ">",
    "noreally.request.params": "<" + JSON.stringify(req.params) + ">",
  });
  res.send("😵");
});

const javascriptToStartTracing = `
  console.log("I am the script yo");
   Hny({  apiKey: "hcaik_01j229z3ezkranjdcgj7e5dvx4vz4prbbkkbgx4rnv4strm0kb485sae9f",
          serviceName: "hny-tricks-web",
          debug: true,
        });
`;
