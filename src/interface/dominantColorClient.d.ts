import { Readable } from "stream";

export interface ColorFraction {
  color: RGBColor;
  score: number;
  pixelFraction: number;
}

export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export interface DominantColorClient {
  getDominantColors(imageStream: Readable): Promise<ColorFraction[]>;
}
