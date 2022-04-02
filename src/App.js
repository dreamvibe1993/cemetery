import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

/*
  TODO:
  *) If email exist show proper notif
  *) Profile preview
  *) Waiting till db connected (FAILED)
  *) Add more ways to connect with user
  *) Light and dark theme
  *) Mobile version
  *) Implement forms?
  *) CHANGE MY EMAIL!!!
  *) Deploy
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
