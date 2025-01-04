import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Minigame from "./Minigame.jsx";
import Weapon from "./Weapon.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/Minigame" element={<Minigame />}>
        <Route path="Weapon" element={<Weapon />}></Route>
      </Route>
    </Routes>
  </Router>,
);
