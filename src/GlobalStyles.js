import { createGlobalStyle } from "styled-components";
import { colors } from "./configs/css/colors";

export const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    background-color: ${colors.primary.rgba(1)};
    position: relative;
    padding-top: 10px;
    color: #fff;
    font-family: Overpass;
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
  
  @import url("https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  
`;
