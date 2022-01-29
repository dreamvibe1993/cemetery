import "./App.css";
import { Paths } from "./Paths";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

function App() {
  console.log(process.env)
  return <Paths />;
}

export default App;
