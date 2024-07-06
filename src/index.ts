import "./tracing";
import express, { Request, Response } from "express";
import { html } from "./htm-but-right";

const app = express();
const port = process.env.PORT || 3000;

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
    </head>
    <body>
      <h1>Welcome to Jessitron's Honeycomb Tricks</h1>
    </body>
  </html>`;
  console.log(element);
  res.send(`<!DOCTYPE html>${element}`);
});

const javascriptToStartTracing = `
  console.log("I am the script yo");
   Hny({
          apiKey:
            "hcaik_01j229z3ezkranjdcgj7e5dvx4vz4prbbkkbgx4rnv4strm0kb485sae9f",
          serviceName: "hny-tricks-web",
          debug: true,
        });
`;
