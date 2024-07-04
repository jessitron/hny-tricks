import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

const greet: string = "Hello wrold"

console.log(greet);
