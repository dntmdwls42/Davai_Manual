import { Routes, Route } from "react-router-dom";
import MinigameMenu from "./MinigameMenu.jsx";
import MinigameRule from "./MinigameRule.jsx";
import Weapon from "../minigame/Weapon.jsx";
import WeaponAndCaliber from "../minigame/WeaponAndCaliber.jsx";

function Minigame() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MinigameMenu />}></Route>
        <Route path="MinigameRule" element={<MinigameRule />}></Route>
        <Route path="Weapon" element={<Weapon />}></Route>
        <Route path="WeaponAndCaliber" element={<WeaponAndCaliber />}></Route>
      </Routes>
    </>
  );
}

export default Minigame;
