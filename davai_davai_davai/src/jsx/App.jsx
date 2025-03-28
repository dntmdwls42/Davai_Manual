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

        <div className="main-card-container">
          <div className="main-card-Carousel-Button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </div>
          <Link className="main-card__border-fixed" to={`/Minigame`}>
            <div className="main-card__contents">
              <img src="/image/USEC-gun-aiming.webp"></img>
              <div className="main-card__text">
                <p>총기 구경 맞추기</p>
              </div>
            </div>
          </Link>
          <Link className="main-card__border-fixed" to={`/Minigame/Weapon`}>
            <div className="main-card__contents">
              <img src="/image/Weapon-parts-disassembly.webp"></img>
              <div className="main-card__text">
                <p>총기 이름 맞추기</p>
              </div>
            </div>
          </Link>
          <Link className="main-card__border-fixed" to={`/AnimationTest`}>
            <div className="main-card__contents">
              <img src="/image/Tarkov-logo.webp"></img>
              <div className="main-card__text">
                <p>애니메이션 테스트</p>
              </div>
            </div>
          </Link>
          <div className="main-card-Carousel-Button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
