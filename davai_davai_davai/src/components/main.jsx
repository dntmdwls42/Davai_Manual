import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Minigame from "./minigame/Minigame";
import Background from "./layout/Background";
import AnimationTest from "./AnimationTest";
import Layout from "./layout/Layout";
import Header from "./layout/Header";

import "../css/common/index.css";
import "../css/components/background.css";
import "../css/components/Header.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Background />
    <Header />
    <Layout />
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/Minigame/*" element={<Minigame />}></Route>
      <Route path="/AnimationTest" element={<AnimationTest />}></Route>
    </Routes>
  </Router>,
);
