import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

/*
  TODO:
  *) Waiting till db connected (FAILED)
  *) CHANGE MY EMAIL!!! (Need to make a special one.)
  *) Deploy
  *) Different clusters of different colors
*/

function App() {
  return (
    <AuthWrapper>
      <GlobalStyles />
      <NotificationModal>
        <TopNavBar />
        <Paths />
      </NotificationModal>
    </AuthWrapper>
  );
}

export default App;
