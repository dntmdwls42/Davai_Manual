import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../css/Minigame.css";

function Weapon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizNumber = parseInt(queryParams.get("number"), 10) || 5;

  const [weaponList, setWeaponList] = React.useState([]);
  const [imageList, setImageList] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [submittedWeapons, setSubmittedWeapons] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [life, setLife] = React.useState(3);
  const [quizCount, setQuizCount] = React.useState(0);
  // minigame 페이지에서 quizNumber를 URL 파라미터로 받아옴
  const [maxQuizCount] = React.useState(quizNumber);
  const [userInput, setUserInput] = React.useState("");
  // 제출 시 버튼 비활성화 및 다음 문제 버튼 출력
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState("");
  // 입력 필드의 focus 상태를 추적하기 위한 state 추가
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const fetchDataList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/weapon");
      if (!response.ok) throw new Error("Failed to fetch weapon list");

      const { weaponList, imageList } = await response.json();
      setWeaponList(weaponList);
      setImageList(imageList);
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

    setData({
      Weapon_Name: randomWeapon.Weapon_Name,
      Image_Name: matchedImage ? matchedImage.Image_Name : null,
    });

    console.log(data);

    setIsSubmitted(false);
    setUserInput("");
    setMessage("");
  };

  React.useEffect(() => {
    fetchDataList();
  }, []);

  // 무기 리스트가 업데이트 되면 무기를 불러옴
  React.useEffect(() => {
    if (weaponList.length > 0) fetchRandomWeapon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaponList]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 입력 필드 focus 이벤트 핸들러 추가
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // 입력 필드 blur 이벤트 핸들러 추가
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 사용자 입력값과 정답 확인 및 비교를 위한 전처리
    if (
      userInput.trim().replace(/\s+/g, "").replace(/-/g, "").toLowerCase() ===
      data.Weapon_Name.trim()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .toLowerCase()
    ) {
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
    setQuizCount((count) => count + 1);
    fetchRandomWeapon();

    setTimeout(() => {
      document.querySelector("#user-input").focus();
    }, 0);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (life < 0 || quizCount >= maxQuizCount) {
    return (
      <>
        <div className="page-container">
          <h3>
            {life < 0
              ? "모든 체력을 소모하였습니다."
              : "모든 문제를 푸셨습니다."}
          </h3>
          <h4>총 문제 수 : {maxQuizCount}</h4>
          <h4>푼 문제 수 : {life < 0 ? quizCount + 1 : quizCount}</h4>
          <h4>맞춘 문제 수 : {score}</h4>
          <h4>남은 생명 : {life < 0 ? 0 : life}</h4>
          <button onClick={handleRestart}>다시 시작하기</button>
        </div>
      </>
    );
  }

  if (isSubmitted) {
    //Timeout을 0ms로 줘도 focus가 되지만 Timeout을 주지 않으면 focus가 안됨
    setTimeout(() => {
      document.querySelector("#next-btn").focus();
    }, 0);
  }

  return (
    <>
      <div id="minigame-container" className="page-container">
        <div className="minigame-quiz">
          <div className="minigame-quiz__back-button">
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
          <h1 className="minigame-quiz__title">무기 이름 맞추기</h1>
          <div className="minigame-quiz__image-container">
            <img
              className="minigame-quiz__image"
              src={`/image/Weapons/${data.Image_Name}.webp`}
            />
          </div>
          <p className="minigame-quiz__description">
            이미지에 표시된 무기의 이름은 무엇일까요?
          </p>
          <div className="minigame-quiz__input-container">
            <form onSubmit={handleSubmit}>
              <input
                className="minigame-quiz__input-form__input"
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                disabled={isSubmitted}
                placeholder={
                  !isInputFocused && !userInput ? "정답을 입력해주세요" : ""
                }
                autoFocus
              />
            </form>

            {message && <div>{message}</div>}

            <h4>
              현재 점수 : {score} | 현재 체력 : {life}
            </h4>
            <h4>총 문제 수 : {maxQuizCount}</h4>

            <button
              className="minigame-quiz__input-form__submit-btn"
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              <span>제출</span>
            </button>

            <button id="next-btn" onClick={handleNext} hidden={!isSubmitted}>
              다음 퀴즈
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weapon;
