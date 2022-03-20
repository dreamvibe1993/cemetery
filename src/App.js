import React from "react";
import { Paths } from "./Paths";
import { GreetingsScreen } from "./components/GreetingsScreen";

import { TopNavBar } from "./components/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { NotificationModal } from "./components/NotificationModal";
import { AuthWrapper } from "./components/AuthWrapper";

/*
  TODO:
  1) Photos in graves
  2) User profile
  3) Request forgotten password
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
