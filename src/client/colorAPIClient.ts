import { ColorProperty, ColorPropertyClient, RGBColor } from "../interface";

import axios from "axios";
import { get } from "lodash";

export default class ColorAPIClient implements ColorPropertyClient {
  getColorProperty = async (color: RGBColor): Promise<ColorProperty> => {
    const colorResponse = await axios({
      method: "get",
      url: `http://www.thecolorapi.com/id?hex=${this.rgbToHex(color)}`
    });
    return {
      name: this.getColorName(colorResponse),
      hex: this.getColorHex(colorResponse),
      cmyk: this.getColorCMYK(colorResponse)
    };
  };

  private componentToHex = (component: number): string => {
    const hex = component ? component.toString(16) : "0";
    return hex.length == 1 ? "0" + hex : hex;
  };

  private rgbToHex = ({ red, green, blue }: RGBColor): string =>
    this.componentToHex(red) +
    this.componentToHex(green) +
    this.componentToHex(blue);

  private getColorName = res => get(res, ["data", "name", "value"]);

  private getColorHex = res => get(res, ["data", "name", "closest_named_hex"]);

  private getColorCMYK = res => {
    const cmyk = get(res, ["data", "cmyk"]);
    return `${get(cmyk, "c")} ${get(cmyk, "m")} ${get(cmyk, "y")} ${get(
      cmyk,
      "k"
    )}`;
  };
}
