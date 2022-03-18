import { hexToRgbA } from "../../services/css/convertion/colors";

//https://colorscheme.ru/#4852kw0w0w0w0
export const colors = {
  primary: {
    hex: "#3B2E84",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  primaryDark: {
    hex: "#180773",
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
    hex: "#1E786C",
    rgba: function (transparency) {
      return hexToRgbA(this.hex, transparency);
    },
  },
  contrastA: {
    hex: "#429c06",
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
