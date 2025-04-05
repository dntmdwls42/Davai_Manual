import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Minigame.css";

function WeaponAndCaliber() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizNumber = parseInt(queryParams.get("number"), 10) || 5;

  const [dataList, setDataList] = React.useState([]);
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

  // data = Weapon_Name, Weapon_Caliber
  const fetchDataList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/weaponAndCaliber",
      );
      if (!response.ok) throw new Error("Failed to fetch data list");

      const data = await response.json();

      setDataList(data);
    } catch (err) {
      console.error(err);
      setMessage("Error : 데이터를 불러오는데 실패했습니다.");
    }
  };

  // 무기 리스트에서 이미 출제한 무기를 제외하고 무기를 랜덤으로 불러옴
  const fetchRandomWeapon = () => {
    const availableWeapons = dataList.filter(
      (data) => !submittedWeapons.includes(data.Weapon_Name),
    );

    // 난수를 이용하여 무기를 랜덤으로 불러옴
    const randomWeapon =
      availableWeapons[Math.floor(Math.random() * availableWeapons.length)];

    setData(randomWeapon);
    setIsSubmitted(false);
    setUserInput("");
    setMessage("");
  };

  React.useEffect(() => {
    fetchDataList();
  }, []);

  // 무기 리스트가 업데이트 되면 무기를 불러옴
  React.useEffect(() => {
    if (dataList.length > 0) fetchRandomWeapon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 사용자 입력값과 정답 확인 및 비교를 위한 전처리
    if (
      userInput.trim().replace(/\s+/g, "").replace(/-/g, "").toLowerCase() ===
      data.Weapon_Caliber.trim()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .toLowerCase()
    ) {
      setScore((score) => score + 1);
      setMessage("정답입니다! 점수가 1점 증가했습니다.");
    } else {
      setMessage(`틀렸습니다. 정답은 ${data.Weapon_Caliber}입니다.`);
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
      <div className="page-container">
        <h1>총기 구경 맞추기</h1>
        <div className="quiz-container center">
          <h3>
            {quizCount + 1}. 총기 이름 : {data.Weapon_Name} 총기 구경 :{" "}
            {data.Weapon_Caliber}
          </h3>
          {/* <img src="/image/AK-103.webp"></img> */}
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              id="user-input"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={isSubmitted}
              placeholder="총기 이름 입력"
              autoFocus
            />
            <button className="form-btn" type="submit" disabled={isSubmitted}>
              <span>제출</span>
            </button>
          </form>
          {message && <div>{message}</div>}

          <h4>
            현재 점수 : {score} | 현재 체력 : {life}
          </h4>
          <h4>총 문제 수 : {maxQuizCount}</h4>

          <button id="next-btn" onClick={handleNext} hidden={!isSubmitted}>
            다음 퀴즈
          </button>
        </div>
      </div>
    </>
  );
}

export default WeaponAndCaliber;
