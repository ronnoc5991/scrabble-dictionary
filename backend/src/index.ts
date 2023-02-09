import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import Trie from "./classes/Trie";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const dictionary = new Trie(
  path.resolve(__dirname, "word-lists", "english.txt")
);

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

app.get("/api", (req: Request, res: Response) => {
  res.send({ isValid: dictionary.search(req.query.word as string) });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
