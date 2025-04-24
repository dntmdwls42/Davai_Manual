import React from "react";
import { Link } from "react-router-dom";

import "../css/components/App.css";
import { backgroundMovement } from "../utils/backgroundMove";

function App() {
  const [cardIndex, setCardIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const cardCount = 8; // Card 갯수에 맞게 수정 필요

  const moveCardLeft = () => {
    if (isTransitioning || cardIndex >= cardCount - 3) return;

    setIsTransitioning(true);
    setCardIndex((prevIndex) => prevIndex + 1);
  };

  const moveCardRight = () => {
    if (isTransitioning || cardIndex <= 0) return;

    setIsTransitioning(true);
    setCardIndex((prevIndex) => prevIndex - 1);
  };

  const handleTranstitionEnd = () => {
    setIsTransitioning(false);
  };

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

        <div className="main-card-button-container">
          <div
            className="main-card-carousel-button1 center"
            onClick={moveCardRight}
          >
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
          <div
            className="main-card-carousel-button2 center"
            onClick={moveCardLeft}
          >
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

          <div className="main-card-overflow-container">
            <div
              className="main-card-container"
              style={{
                transform: `translateX(-${cardIndex * 34}%)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTranstitionEnd}
            >
              <Link className="main-card__link" to={`/Minigame`}>
                <div className="main-card__contents">
                  <img src="/image/USEC-gun-aiming.webp"></img>
                  <div className="main-card__text">
                    <p>총기 퀴즈 풀기</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/Minigame/Weapon`}>
                <div className="main-card__contents">
                  <img src="/image/Weapon-parts-disassembly.webp"></img>
                  <div className="main-card__text">
                    <p>총기 이름 맞추기</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
              <Link className="main-card__link" to={`/AnimationTest`}>
                <div className="main-card__contents">
                  <img src="/image/Tarkov-logo.webp"></img>
                  <div className="main-card__text">
                    <p>애니메이션 테스트</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
