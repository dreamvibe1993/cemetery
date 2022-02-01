import "./App.css";
import React from "react";
import styled from "styled-components/macro";
import { Paths } from "./Paths";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { GreetingsScreen } from "./components/GreetingsScreen";

import { ReactComponent as TriangleWD } from "./media/svg/triangle-down.svg";
import { DropDown } from "./lib/css/animations";
import { DetailsScreen } from "./components/DetailsScreen";

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage();

function App() {
  const [isGreetingsShown, setGreetingsShown] = React.useState(false);
  const [isHelpRequested, setHelpRequested] = React.useState(false);

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

  const showDetailsScreen = () => {
    setHelpRequested(true);
  }

  const hideDetailsScreen = () => {
    setHelpRequested(false);
  }

  return (
    <>
      {isGreetingsShown && <GreetingsScreen onClose={closeGreetings} />}
      {isHelpRequested && <DetailsScreen onClose={hideDetailsScreen} />}
      <TipButton onClick={showDetailsScreen}>
        <TriangleWD />
      </TipButton>
      <Paths />
    </>
  );
}

export default App;

const TipButton = styled.div`
  position: fixed;
  right: 60px;
  top: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${DropDown} .7s ease-in-out;
  svg {
    width: 50%;
    height: 50%;
  }
`;
