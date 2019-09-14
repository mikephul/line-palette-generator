import { RGBColor } from "./dominantColorClient";

export interface ColorProperty {
  name: string;
  hex: string;
  cmyk: string;
}

export interface ColorPropertyClient {
  getColorProperty(color: RGBColor): Promise<ColorProperty>;
}
