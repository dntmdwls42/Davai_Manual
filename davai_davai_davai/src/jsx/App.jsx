import React from "react";
import { Link } from "react-router-dom";

import "../css/app.css";
import { backgroundMovement } from "../components/backgroundMove";

function App() {
  React.useEffect(() => {
    backgroundMovement();
  }, []);

  return (
    <>
      <div id="main-container" className="page-container">
        <div className="title-container center-column">
          <h1 className="main-title">
            <Link to={`/`}>Davai manual</Link>
          </h1>
          <h2 className="sub-title">
            <Link to={`/`}>Minigame of EFT</Link>
          </h2>
        </div>

        <div className="main-btn-container">
          <button className="main-btn">
            <Link to={`/Minigame`}>문제 풀이</Link>
          </button>
          <button className="main-btn">
            <Link to={`/Minigame/Weapon`}>총기 문제</Link>
          </button>
          <button className="main-btn">
            <Link to={`/animationTest`}>애니메이션 테스트</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
