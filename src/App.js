import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";
import { colorsBlack, colorsGreen, colorsWhite } from "./configs/css/colors";
import { ThemeProvider } from "styled-components";

export const ColorTheme = React.createContext();

/*
  TODO:
  *) Waiting till db connected (FAILED)
  *) Light and dark theme
  *) Mobile version
  *) CHANGE MY EMAIL!!!
  *) Deploy
  *) Different clusters of different colors
*/

function App() {
  const [colorSet, setColorSet] = React.useState(colorsWhite);

  return (
    <ColorTheme.Provider value={{ colorSet, setColorSet }}>
      <ThemeProvider theme={colorSet}>
        <GlobalStyles />
        <NotificationModal>
          <AuthWrapper>
            <TopNavBar />
            <Paths />
          </AuthWrapper>
        </NotificationModal>
      </ThemeProvider>
    </ColorTheme.Provider>
  );
}

export default App;
