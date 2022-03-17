import React from "react";
import { Paths } from "./Paths";
import { GreetingsScreen } from "./components/GreetingsScreen";

import { checkUserAuth } from "./api/user";
import { TopNavBar } from "./components/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";

function App() {
  const [isGreetingsShown, setGreetingsShown] = React.useState(false);

  React.useEffect(() => {
    checkUserAuth();
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
      {isGreetingsShown && <GreetingsScreen onClose={closeGreetings} />}
      <TopNavBar />
      <Paths />
    </>
  );
}

export default App;

