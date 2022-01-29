import "./App.css";
import { Paths } from "./Paths";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage();

function App() {
  // alert(
  //   "TODO: \n1. Добавить прелоудеры к фоткам. \n2. Добавить возможность похоронить. \n3. Добавить возможность подарить подарок. \n4. Добавить регистрацию и авторизацию. \n5. Отписки от вебсокета."
  // );
  return <Paths />;
}

export default App;
