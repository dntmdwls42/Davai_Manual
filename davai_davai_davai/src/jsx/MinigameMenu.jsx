import React from "react";
import { Link } from "react-router-dom";
import "../css/MinigameMenu.css";

function MinigameMenu() {
  const [quizNumber, setQuizNumber] = React.useState(5);

  const handleNumber = (e) => {
    setQuizNumber(e.target.value);
  };

  return (
    <>
      <div id="minigame-container" className="page-container">
        <div className="minigame-menu">
          <div className="minigame-menu__back-button">
            <Link to={`/`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                viewBox="0 -960 960 960"
                width="100%"
                fill="#e3e3e3"
              >
                <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </Link>
          </div>
          <h1 className="minigame-menu__title">총기 퀴즈 선택</h1>
          {/* 아래에 삽입된 이미지는 임시임. */}
          <div className="minigame-menu__quiz-hint-image">
            <img src="/image/USEC-gun-aiming.webp" alt="USEC-gun-aiming" />
          </div>
          <div className="minigame-menu__quiz-selector center-column">
            <p className="minigame-menu__quiz-selector__text">
              문제 유형과 갯수를 선택하세요
            </p>
            <select className="minigame-menu__quiz-type-selector">
              <option value="1">총기 이름 맞추기</option>
              <option value="2">총기 구경 맞추기</option>
            </select>
            <select
              className="minigame-menu__quiz-number-selector"
              value={quizNumber}
              onChange={handleNumber}
            >
              <option value={5}>5개</option>
              <option value={10}>10개</option>
              <option value={15}>15개</option>
            </select>
          </div>
          <Link to={`/Minigame/Weapon?number=${quizNumber}`}>
            <button className="minigame-menu__quiz-selector__button">
              <p>문제 시작</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MinigameMenu;
