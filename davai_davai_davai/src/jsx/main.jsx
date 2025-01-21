import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Minigame from "./Minigame";
import Weapon from "./Weapon";
import "../css/index.css";
import "../css/background.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/Minigame" element={<Minigame />}></Route>
      <Route path="/Minigame/Weapon" element={<Weapon />}></Route>
    </Routes>
  </Router>,
);
