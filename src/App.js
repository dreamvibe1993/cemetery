import React from "react";
import { Paths } from "./Paths";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

/*
  TODO:
  6) Waiting till db connected (FAILED)
  6.1) Unsubscribing from apis
  7) Change design to a darker one
  7) Add more ways to connect with user
  8) Mobile version
  8.1) Implement forms?
  8.2) CHANGE MY EMAIL!!!
  9) Deploy
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
