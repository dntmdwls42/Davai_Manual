import React from "react";
import { useLocation, Link } from "react-router-dom";

import "../../css/components/Minigame.css";

import {
  setScoreToLocalStorage,
  getScoreFromLocalStorage,
} from "../../utils/useLocalStorage.js";
import { onClickBackButton } from "../../utils/utils.js";

function Weapon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizNumber = parseInt(queryParams.get("number"), 10) || 5; // 999는 모든 문제를 의미함
  const quizType = queryParams.get("quizType") || "weapon";

  const [weaponList, setWeaponList] = React.useState([]);
  const [imageList, setImageList] = React.useState([]);
  const [weaponAnswersList, setWeaponAnswersList] = React.useState({});
  const [data, setData] = React.useState(null);
  const [submittedWeapons, setSubmittedWeapons] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [life, setLife] = React.useState(3);
  const [quizCount, setQuizCount] = React.useState(0);
  // minigame 페이지에서 quizNumber를 URL 파라미터로 받아옴
  const [maxQuizCount, setMaxQuizCount] = React.useState(quizNumber);
  const [userInput, setUserInput] = React.useState("");
  // 제출 시 버튼 비활성화 및 다음 문제 버튼 출력
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [userName, setUserName] = React.useState("Anonymous");
  const [rankings, setRankings] = React.useState([]);

  const checkAnswer = (userInput, answers) => {
    if (!userInput || !answers || answers.length === 0) return false;

    // 사용자 입력값과 정답 확인 및 비교를 위한 전처리
    const normalizedInput = userInput
      .trim()
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .toLowerCase();

    // 사용자의 입력이 정답 문자열에 포함되어 있으면 true가 반환됨
    return answers.some((answer) => {
      const normalizedAnswer = answer
        .trim()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .toLowerCase();

      return normalizedInput.includes(normalizedAnswer);
    });
  };

  const fetchDataList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/weapon");
      if (!response.ok) throw new Error("Failed to fetch weapon list");

      const { weaponList, imageList, weaponAnswersList } =
        await response.json();

      setWeaponList(weaponList);
      setImageList(imageList);
      setWeaponAnswersList(weaponAnswersList);

      console.log("weaponAnswersList : ", weaponAnswersList);
    } catch (err) {
      console.error(err);
      setMessage("Error : 데이터를 불러오는데 실패했습니다.");
    }
  };

  // 무기 리스트에서 이미 출제한 무기를 제외하고 무기를 랜덤으로 불러옴
  const fetchRandomWeapon = () => {
    const availableWeapons = weaponList.filter(
      (weapon) => !submittedWeapons.includes(weapon.Weapon_Name),
    );

    // 난수를 이용하여 무기를 랜덤으로 불러옴
    const randomWeapon =
      availableWeapons[Math.floor(Math.random() * availableWeapons.length)];

    const matchedImage = imageList.find(
      (item) => item.Image_Item_Name === randomWeapon.Weapon_Name,
    );

    const matchedWeaponAnswers = weaponAnswersList[randomWeapon.Weapon_Name];

    setData({
      Weapon_Name: randomWeapon.Weapon_Name,
      Image_Name: matchedImage ? matchedImage.Image_Name : null,
      matchedWeaponAnswers: matchedWeaponAnswers,
    });

    console.log("RandomWeapon : ", randomWeapon);
    console.log("MatchedWeaponAnswer : ", matchedWeaponAnswers);

    setIsSubmitted(false);
    setUserInput("");
    setMessage("");
    setRankings([]);
  };

  React.useEffect(() => {
    fetchDataList();
  }, []);

  React.useEffect(() => {
    if (quizNumber === 999) {
      setMaxQuizCount(weaponList.length);
    }
  }, [data]);

  // 무기 리스트가 업데이트 되면 무기를 불러옴
  React.useEffect(() => {
    if (weaponList.length > 0) fetchRandomWeapon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaponList]);

  React.useEffect(() => {
    if (isGameOver) {
      setScoreToLocalStorage(quizType, quizNumber, userName, score);
      setRankings(getScoreFromLocalStorage(quizType, quizNumber));
    }
  }, [isGameOver]);

  React.useEffect(() => {
    console.log("rankings : ", rankings);
  }, [rankings]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCorrect = checkAnswer(userInput, data.matchedWeaponAnswers);

    if (isCorrect) {
      setScore((score) => score + 1);
      setMessage("정답입니다! 점수가 1점 증가했습니다.");
    } else {
      setMessage(`틀렸습니다. 정답은 ${data.Weapon_Name}입니다.`);
      setLife((life) => life - 1);
    }

    setIsSubmitted(true);
    setSubmittedWeapons((prev) => [...prev, data?.Weapon_Name]);
  };

  const handleNext = () => {
    if (life < 0 || quizCount >= maxQuizCount - 1) {
      setIsGameOver(true);
    } else {
      setQuizCount((count) => count + 1);
      fetchRandomWeapon();

      setTimeout(() => {
        document.querySelector("#user-input").focus();
      }, 0);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (isGameOver) {
    return (
      <>
        <div id="minigame-container" className="page-container">
          <div className="minigame-gameover">
            <h1 className="minigame-quiz__game-over-title">
              {isGameOver
                ? "모든 체력을 소모하였습니다."
                : "모든 문제를 푸셨습니다."}
            </h1>
            <h2 className="minigame-quiz__game-over__quiz-total-count">
              총 문제 수 : {maxQuizCount}
            </h2>
            <h2 className="minigame-quiz__game-over__quiz-try-count">
              푼 문제 수 : {isGameOver ? quizCount + 1 : quizCount}
            </h2>
            <h2 className="minigame-quiz__game-over__quiz-clear-count">
              맞춘 문제 수 : {score}
            </h2>
            <h2 className="minigame-quiz__game-over__quiz-hp-remain">
              남은 생명 : {isGameOver ? 0 : life}
            </h2>

            <div className="minigame-quiz__game-over__rankings">
              <h2>
                1.{" "}
                {rankings[0]
                  ? "이름 : " +
                    rankings[0].userName +
                    " " +
                    "점수 : " +
                    rankings[0].score +
                    "점"
                  : ""}
              </h2>
              <h2>
                2.{" "}
                {rankings[1]
                  ? "이름 : " +
                    rankings[1].userName +
                    " " +
                    "점수 : " +
                    rankings[1].score +
                    "점"
                  : ""}
              </h2>
              <h2>
                3.{" "}
                {rankings[2]
                  ? "이름 : " +
                    rankings[2].userName +
                    " " +
                    "점수 : " +
                    rankings[2].score +
                    "점"
                  : ""}
              </h2>
              <h2>
                4.{" "}
                {rankings[3]
                  ? "이름 : " +
                    rankings[3].userName +
                    " " +
                    "점수 : " +
                    rankings[3].score +
                    "점"
                  : ""}
              </h2>
              <h2>
                5.{" "}
                {rankings[4]
                  ? "이름 : " +
                    rankings[4].userName +
                    " " +
                    "점수 : " +
                    rankings[4].score +
                    "점"
                  : ""}
              </h2>
            </div>
            <button
              className="minigame-quiz__game-over__quiz-restart-button"
              onClick={handleRestart}
            >
              다시 시작하기
            </button>
          </div>
        </div>
      </>
    );
  }

  if (isSubmitted) {
    //Timeout을 0ms로 줘도 focus가 되지만 Timeout을 주지 않으면 focus가 안됨
    setTimeout(() => {
      document.querySelector("#next-quiz-btn").focus();
    }, 0);
  }

  return (
    <>
      <div id="minigame-container" className="page-container">
        <div className="minigame-quiz">
          <div className="back-button" onClick={onClickBackButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
              viewBox="0 -960 960 960"
              width="100%"
              fill="#e3e3e3"
            >
              <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </div>
          <h1 className="minigame-quiz__title">무기 이름 맞추기</h1>
          <h2 className="minigame-quiz__number">{maxQuizCount} 문제</h2>
          <div className="minigame-quiz__image-container">
            <img
              className="minigame-quiz__image"
              src={`/image/Weapons/${data.Image_Name}.webp`}
            />
          </div>
          <span className="minigame-quiz__description">
            이미지에 표시된 무기의 이름은 무엇일까요?
          </span>

          <div className="minigame-quiz__score-container">
            <span>
              현재 점수 : {score} | 현재 체력 : {life < 0 ? 0 : life}
            </span>
          </div>

          <div className="minigame-quiz__form-container">
            <form className="minigame-quiz__form" onSubmit={handleSubmit}>
              <input
                id="user-input"
                className="minigame-quiz__form__input"
                type="text"
                value={userInput}
                onChange={handleInputChange}
                disabled={isSubmitted}
                placeholder="정답을 입력해주세요"
                autoFocus
              />

              {message && <div>{message}</div>}

              <button
                className="minigame-quiz__form__submit-btn"
                hidden={isSubmitted}
              >
                제출
              </button>
            </form>

            <button
              id="next-quiz-btn"
              className="minigame-quiz__next-btn"
              onClick={handleNext}
              hidden={!isSubmitted}
            >
              다음 퀴즈
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weapon;
