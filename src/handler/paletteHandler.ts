import { ColorPropertyClient, DominantColorClient } from "../interface";
import { Client as LineClient, MessageEvent } from "@line/bot-sdk";

import { get } from "lodash";
import { getPantoneCard } from "../message_template/pantoneCard";

export default class PaletteHandler {
  constructor(
    private readonly lineClient: LineClient,
    private readonly colorPropertyClient: ColorPropertyClient,
    private readonly dominantColorClient: DominantColorClient
  ) {}

  getPaletteCards = async (event: MessageEvent) => {
    const messageId = get(event, ["message", "id"]);
    const imageStream = await this.lineClient.getMessageContent(messageId);
    const colors = await this.dominantColorClient.getDominantColors(
      imageStream
    );
    const colorProperties = await Promise.all(
      colors.map(color =>
        this.colorPropertyClient.getColorProperty(color.color)
      )
    );
    const pantoneCards = colorProperties.map(getPantoneCard);
    return {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "carousel",
        contents: pantoneCards
      }
    };
  };
}
