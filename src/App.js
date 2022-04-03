import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

/*
  TODO:
  *) If email exist show proper notif
  *) Waiting till db connected (FAILED)
  *) Ban
  *) Delete account
  *) Light and dark theme
  *) Mobile version
  *) Implement forms?
  *) CHANGE MY EMAIL!!!
  *) Deploy
  *) Different clusters of different colors
*/

function App() {
  return (
    <>
      <GlobalStyles />
      <NotificationModal>
        <AuthWrapper>
          <TopNavBar />
          <Paths />
        </AuthWrapper>
      </NotificationModal>
    </>
  );
}

export default App;
