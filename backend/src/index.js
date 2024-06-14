import express from "express";
import {
  issues,
  getIssue,
  editIssue,
  createIssue,
  deleteIssue,
} from "./issues.js";
import { Database } from "./database.js";

export const app = express();
app.use(express.json());

export const database = new Database();

app.get("/issues", async (req, res) => {
  issues(database);
});

app.post("/issues", (req, res) => {
  const newItem = req.body;
  res.send(`Item added: ${newItem.name}`);
});

app.put("/issues/:id", (req, res) => {
  const itemId = req.params.id;
  res.send(`Item with ID ${itemId} updated`);
});

app.delete("/issues/:id", (req, res) => {
  const itemId = req.params.id;
  res.send(`Item with ID ${itemId} deleted`);
});
