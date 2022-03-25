import { createGlobalStyle } from "styled-components";
import { colors } from "./configs/css/colors";

export const GlobalStyles = createGlobalStyle`
  
  body {
    display: flex;
    justify-content: center;
    background-color: ${colors.secondaryB.rgba(1)};
    position: relative;
    padding-top: 10px;
    color: #fff;
    font-family: Overpass;
    margin-top: 90px;
  }
  
  /* Custom properties */
  :root {
    --tooltip-text-color: white;
    --tooltip-background-color: black;
    --tooltip-margin: 60px;
    --tooltip-arrow-size: 6px;
  }
  
  * {
    box-sizing: border-box;
    scrollbar-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.3);
    scrollbar-width: thin;
  }
  
  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  
  *::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
  }
  
  
`;