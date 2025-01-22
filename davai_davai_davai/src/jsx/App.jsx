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
      <div id="main-container">
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
            <Link to={`/Minigame`}>총기 문제</Link>
          </button>
          <button className="main-btn">
            <Link to={`/`}>Button 2</Link>
          </button>
          <button className="main-btn">
            <Link to={`/`}>Button 3</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
