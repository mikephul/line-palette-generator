import * as createStreamFromString from "string-to-stream";

import { ColorFraction, DominantColorClient } from "../interface";
import {
  CombinedStream,
  create as createCombinedStream
} from "combined-stream";

import { Encoder as Base64Encoder } from "b64";
import { Readable as ImageStream } from "stream";
import axios from "axios";
import { get } from "lodash";

export default class GoogleVisionClient implements DominantColorClient {
  getDominantColors = async (
    imageStream: ImageStream
  ): Promise<ColorFraction[]> => {
    const visionResponse = await axios({
      method: "post",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.VISION_API_KEY}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: this.createImagePropertiesStream(imageStream)
    });
    return this.extractDominantColors(visionResponse);
  };

  private extractDominantColors = (visionResponse): ColorFraction[] =>
    get(visionResponse, [
      "data",
      "responses",
      0,
      "imagePropertiesAnnotation",
      "dominantColors",
      "colors"
    ]);

  private createImagePropertiesStream = (
    imageStream: ImageStream
  ): CombinedStream => {
    const base64Encoder = new Base64Encoder();
    const base64Stream = imageStream.pipe(base64Encoder);
    const streamSeparator = "random-separator:Zsf2aUCVB2bTAI1DCuRuMh1LArLyWG9S";
    const requestTemplate = JSON.stringify({
      requests: [
        {
          image: {
            content: streamSeparator
          },
          features: [
            {
              type: "IMAGE_PROPERTIES"
            }
          ]
        }
      ]
    });
    const [requestPrologue, requestEpilogue] = requestTemplate.split(
      streamSeparator
    );
    const requestStream = createCombinedStream();
    requestStream.append(createStreamFromString(requestPrologue));
    requestStream.append(base64Stream);
    requestStream.append(createStreamFromString(requestEpilogue));
    return requestStream;
  };
}
