import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../css/components/MinigameMenu.css";

function MinigameRule() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizNumber = parseInt(queryParams.get("number"), 10) || 5;

  const [quizType, setQuizType] = React.useState(
    queryParams.get("quizType") || "weapon",
  );

  const [quizTitle, setQuizTitle] = React.useState("총기 이름 맞추기");

  console.log("quizType : ", quizType);

  const getQuizLink = () => {
    switch (quizType) {
      case "weapon":
        return `/Minigame/Weapon?number=${quizNumber}`;
      case "weaponAndCaliber":
        return `/Minigame/WeaponAndCaliber?number=${quizNumber}`;
    }
  };

  React.useEffect(() => {
    switch (quizType) {
      case "weapon":
        setQuizTitle("총기 이름 맞추기 규칙");
        return;
        "";
      case "weaponAndCaliber":
        setQuizTitle("총기 구경 맞추기 규칙");
        return;
    }
  }, []);

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
          <h1 className="minigame-menu__title">{quizTitle}</h1>
          <div className="minigame-menu__quiz-selector center-column">
            <p className="minigame-menu__quiz-selector__text">공통규칙.</p>
            <p className="minigame-menu__quiz-selector__text">
              1. 문제 정답은 영어, 숫자, 특수기호로 입력해주세요.
              <br />
              2. 문제를 맞추면 다음 문제로 넘어갑니다.
              <br />
              3. 문제를 틀리면 생명이 하나 줄어듭니다.
              <br />
              4. 생명은 최대 4개로 모두 소진되면 게임이 종료됩니다.
              <br />
              5. 문제를 모두 맞추면 게임이 종료됩니다.
            </p>
            <p className="minigame-menu__quiz-selector__text">
              무기 이름 맞추기 규칙.
            </p>
            <p className="minigame-menu__quiz-selector__text">
              1. 띄어쓰기, " - " 의 경우에는 작성을 꼭 하지 않으셔도 됩니다.
              <br />
              예시&#41; RD-704 : "RD704" 라고 적어도 정답입니다.
              <br />
              2. 총기의 풀네임을 적지 않아도 됩니다.
              <br />
              예시&#41; G28 : "HK G28", "G28", "HK417" 모두 정답입니다.
              <br />
              3. 외형으로 구분이 불가능하거나 힘든 총기 종류는 모두 중복 정답
              처리됩니다.
              <br />
              예시&#41; SVT-40 &#60;-&#62; AVT-40 : 양쪽 다 총기 이름이 모두
              정답입니다.
            </p>
          </div>
          <Link to={getQuizLink()}>
            <button className="minigame-menu__quiz-selector__button">
              <p>문제 시작</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MinigameRule;
