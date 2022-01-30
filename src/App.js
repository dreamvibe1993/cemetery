import "./App.css";
import { Paths } from "./Paths";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import React from "react";
import { TutorialModal } from "./components/TutorialModal";

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage();

function App() {
  const [isTutorialShown, setTutorialShown] = React.useState(false);

  React.useEffect(() => {
    const isFirstTime = localStorage.getItem("isLastResortFT");
    if (!isFirstTime) {
      setTutorialShown(true);
    }
  }, []);

  const closeTutorial = () => {
    localStorage.setItem("isLastResortFT", true);
    setTutorialShown(false);
  };

  return (
    <>
      {isTutorialShown && <TutorialModal onClose={closeTutorial}/>}
      <Paths />
    </>
  );
}

export default App;
