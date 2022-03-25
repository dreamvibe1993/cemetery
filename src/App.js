import React from "react";
import { Paths } from "./Paths";
import { GreetingsScreen } from "./components/GreetingsScreen";

import { TopNavBar } from "./components/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/NotificationModal";
import { AuthWrapper } from "./components/AuthWrapper";

/*
  TODO:
  3) Changing password
  3.1) Make a mail notification
  4) Make possible to check another user's profile
  5) Cant create born date older then death date
  6) Waiting till db connected
  7) Change design to a darker one
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
