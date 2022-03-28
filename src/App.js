import React from "react";
import { Paths } from "./Paths";
import { GreetingsScreen } from "./components/Modals/GreetingsScreen";

import { TopNavBar } from "./components/App/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/Modals/NotificationModal";
import { AuthWrapper } from "./components/HOCs/AuthWrapper";

/*
  TODO:
  3) Changing password
  3.1) Make a mail notification
  4) Make possible to check another user's profile
  5) Cant create born date older then death date
  6) Waiting till db connected
  7) Change design to a darker one
  8) Mobile version
  8.1) Implement forms?
  8.2) CHANGE MY EMAIL!!!
  9) Deploy
*/

function App() {
  const [isGreetingsShown, setGreetingsShown] = React.useState(false);

  React.useEffect(() => {
    const isFirstTime = localStorage.getItem("isLastResortFT");
    if (!isFirstTime) {
      setGreetingsShown(true);
    }
  }, []);

  const closeGreetings = () => {
    localStorage.setItem("isLastResortFT", true);
    setGreetingsShown(false);
  };

  return (
    <>
      <GlobalStyles />
      <NotificationModal>
        <AuthWrapper>
          {isGreetingsShown && <GreetingsScreen onClose={closeGreetings} />}
          <TopNavBar />
          <Paths />
        </AuthWrapper>
      </NotificationModal>
    </>
  );
}

export default App;
