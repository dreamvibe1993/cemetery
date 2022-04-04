import { createGlobalStyle } from "styled-components";
import { colorsGreen } from "./configs/css/colors";

export const GlobalStyles = createGlobalStyle`
  
  body {
    display: flex;
    justify-content: center;
    position: relative;
    padding-top: 10px;
    color: #fff;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 90px;
    background-color: ${colorsGreen.secondaryB.rgba(1)};
  }

  input {
    ::placeholder {
      color: rgba(255,255,255, 0.4);
    }
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
    width: 10px;
    height: 10px;
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
