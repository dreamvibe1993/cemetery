import { hexToRgbA } from "../../services/css/convertion/colors";

function getRgba(transparency) {
  return hexToRgbA(this.hex, transparency);
}

export const colorsGreen = {
  primary: {
    hex: "#37b394",
    rgba: getRgba,
  },
  primaryDark: {
    hex: "#030a17",
    rgba: getRgba,
  },
  primaryLight: {
    hex: "#604BD8",
    rgba: getRgba,
  },
  secondaryA: {
    hex: "#8D2373",
    rgba: getRgba,
  },
  secondaryB: {
    hex: "#37b394",
    rgba: getRgba,
  },
  contrastA: {
    hex: "#37b394",
    rgba: getRgba,
  },
  contrastB: {
    hex: "#000000",
    rgba: getRgba,
  },
  error: {
    hex: "#e81313",
    rgba: getRgba,
  },
  textColor: {
    hex: "#ffffff",
    rgba: getRgba,
  },
};
