import * as bodyParser from "body-parser";
import * as express from "express";

import { ColorAPIClient, GoogleVisionClient, LineReplyClient } from "./client";
import { LineEventHandler, PaletteHandler } from "./handler";

import { Client } from "@line/bot-sdk";
import { config } from "dotenv";
import { get } from "lodash";

config();

// Initialize Express App
const app = express();
app.use(bodyParser.json());

// Intialize Clients
const lineClient = new Client({
  channelAccessToken: process.env.LINE_ACCESS_TOKEN
});
const lineReplyClient = new LineReplyClient(lineClient);
const colorClient = new ColorAPIClient();
const visionClient = new GoogleVisionClient();

// Initialize Handlers
const paletteHandler = new PaletteHandler(
  lineClient,
  colorClient,
  visionClient
);
const eventHandler = new LineEventHandler(paletteHandler);

app.post("/webhook", async (req, res) => {
  const event = get(req, ["body", "events", "0"]);
  console.log(event);
  const messages = await eventHandler.handleMessage(event);
  console.log(messages);
  if (messages) {
    await lineReplyClient.replyMessage(event, messages);
  }
  return res.sendStatus(200);
});

app.get("/health", (req, res) => res.sendStatus(200));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Webhook running on port", port));

// webhook-khogtqzpuq-an.a.run.app/webhook
