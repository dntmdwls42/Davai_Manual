import { Routes, Route } from "react-router-dom";
import MinigameMenu from "./MinigameMenu.jsx";
import Weapon from "./Weapon.jsx";
import WeaponAndCaliber from "./WeaponAndCaliber.jsx";

function Minigame() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MinigameMenu />}></Route>
        <Route path="Weapon" element={<Weapon />}></Route>
        <Route path="WeaponAndCaliber" element={<WeaponAndCaliber />}></Route>
      </Routes>
    </>
  );
}

export default Minigame;
