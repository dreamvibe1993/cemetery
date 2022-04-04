import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

const ColorTheme = React.createContext();

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
  const [colorSet, setColorSet] = React.useState({});
  
  return (
    <ColorTheme.Provider>
      <GlobalStyles />
      <NotificationModal>
        <AuthWrapper>
          <TopNavBar />
          <Paths />
        </AuthWrapper>
      </NotificationModal>
    </ColorTheme.Provider>
  );
}

export default App;
