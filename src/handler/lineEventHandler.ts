import { EventMessage, MessageEvent } from "@line/bot-sdk";

import PaletteHandler from "./paletteHandler";
import { get } from "lodash";

export default class LineEventHandler {
  constructor(private readonly paletteHandler: PaletteHandler) {}
  handleMessage = async (event: MessageEvent) => {
    // Handle verfify message
    const replyToken = get(event, "replyToken");
    if (replyToken === "00000000000000000000000000000000") return null;

    // Handle other message
    const message: EventMessage = get(event, "message") as EventMessage;
    const messageType = get(message, "type");
    switch (messageType) {
      case "text":
        return { type: "text", text: "text" };
      // return null;
      case "image":
        return await this.paletteHandler.getPaletteCards(event);
      case "video":
        return { type: "text", text: "video" };
      case "audio":
        return { type: "text", text: "audio" };
      case "location":
        return { type: "text", text: "location" };
      case "sticker":
        return { type: "text", text: "sticker" };
      case "file":
        return { type: "text", text: "file" };
      default:
        throw new Error(`Unknown message: ${JSON.stringify(message)}`);
    }
  };
}
