import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import { Paths } from "./Paths";
import { Home } from "./pages/Home";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Paths />
  );
}

export default App;
