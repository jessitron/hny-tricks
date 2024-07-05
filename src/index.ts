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
  const element = html`<html>
    <body>
      <h1>Welcome to Jessitron's Honeycomb Tricks
    </body>
  </html>`;
  console.log(element);
  res.send(`<!DOCTYPE html>${element}`);
});
