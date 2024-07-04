import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/", (req, res) => {
  console.log("here we are at /")
  res.send("Welcome to Jessitron's Honeycomb Tricks");
})

const greet: string = "Hello wrold"

console.log(greet);
