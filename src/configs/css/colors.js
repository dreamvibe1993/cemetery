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
  textColor: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  white: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  error: {
    hex: "#100a40",
    rgba: getRgba,
  },
};

export const colorsBlack = {
  primary: {
    hex: "#040117",
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
    hex: "#040117",
    rgba: getRgba,
  },
  contrastA: {
    hex: "#040117",
    rgba: getRgba,
  },
  contrastB: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  textColor: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  white: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  error: {
    hex: "#100a40",
    rgba: getRgba,
  },
};

export const colorsWeird = {
  primary: {
    hex: "#3241a6",
    rgba: getRgba,
  },
  primaryDark: {
    hex: "#347871",
    rgba: getRgba,
  },
  primaryLight: {
    hex: "#bf1776",
    rgba: getRgba,
  },
  secondaryA: {
    hex: "#db9d7b",
    rgba: getRgba,
  },
  secondaryB: {
    hex: "#db9d7b",
    rgba: getRgba,
  },
  contrastA: {
    hex: "#338bde",
    rgba: getRgba,
  },
  contrastB: {
    hex: "#d12dd6",
    rgba: getRgba,
  },
  textColor: {
    hex: "#4c2f4d",
    rgba: getRgba,
  },
  white: {
    hex: "#ffffff",
    rgba: getRgba,
  },
  error: {
    hex: "#100a40",
    rgba: getRgba,
  },
};
