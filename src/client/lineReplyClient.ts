import { Client, MessageEvent } from "@line/bot-sdk";
import { get } from "lodash";

export default class LineReplyClient {
  constructor(private readonly lineClient: Client) {}

  public replyMessage = async (event: MessageEvent, message) => {
    const replyToken = get(event, "replyToken") as string;
    await this.lineClient.replyMessage(replyToken, message);
  };
}
