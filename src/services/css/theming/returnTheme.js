import { allColors } from "../../../configs/css/colors";

export const returnTheme = (id) => {
  const theme = allColors.find((colorTheme) => colorTheme.id === id);
  if (!theme) {
    console.error("No such theme! Returned black by default");
    return allColors.find((colorTheme) => colorTheme.id === "black").theme;
  }
  return theme.theme;
};
