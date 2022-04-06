import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
  body {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    color: ${(p) => p.theme.textColor.hex};
    font-family: 'Courier New', Courier, monospace;
    background-color: ${(p) => p.theme.secondaryB.rgba(1)};
  }

  #root {
    margin-top: 90px;
  }

  input {
    ::placeholder {
      color: ${(p) => p.theme.textColor.rgba(0.4)};
    }
  }
  
  /* Custom properties */
  :root {
    --tooltip-text-color: ${(p) => p.theme.contrastB.hex};
    --tooltip-background-color: ${(p) => p.theme.textColor.hex};
    --tooltip-margin: 60px;
    --tooltip-arrow-size: 6px;
  }
  
  * {
    box-sizing: border-box;
    scrollbar-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.3);
    scrollbar-width: thin;
    transition: background-color .1s linear, color .1s linear; 
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
