import { hexToRgbA } from "../../services/css/convertion/colors";

//https://colorscheme.ru/#4852kw0w0w0w0
export const colors = {
  primary: {
    hex: "#37b394",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  primaryDark: {
    hex: "#030a17",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  primaryLight: {
    hex: "#604BD8",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  secondaryA: {
    hex: "#8D2373",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  secondaryB: {
    hex: "#37b394",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  contrastA: {
    hex: "#37b394",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  error: {
    hex: "#e81313",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  }
};
