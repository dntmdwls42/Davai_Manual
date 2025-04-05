import React from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";

function Menu() {
  const [quizNumber, setQuizNumber] = React.useState(5);

  const handleNumber = (e) => {
    setQuizNumber(e.target.value);
  };

  return (
    <>
      <div id="minigame-container" className="page-container">
        <div className="minigame-menu">
          <h1 className="minigame-menu__title">총기 퀴즈 선택</h1>
          {/* 아래에 삽입된 이미지는 임시임. */}
          <img
            className="minigame-menu__quiz-hint-image"
            src="/image/USEC-gun-aiming.webp"
            alt="USEC-gun-aiming"
          />
          <div className="minigame-menu__quiz-selector">
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
          <Link
            to={`/Minigame/Weapon?number=${quizNumber}`}
            style={{ margin: "10px" }}
          >
            <button className="minigame-menu__quiz-selector__button">
              <p>문제 시작</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
