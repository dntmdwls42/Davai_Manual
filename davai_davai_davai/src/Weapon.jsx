import React from "react";
import { useLocation } from "react-router-dom";

function Weapon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizNumber = parseInt(queryParams.get("number"), 10) || 5;

  const [weaponList, setWeaponList] = React.useState([]);
  const [weapon, setWeapon] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [life, setLife] = React.useState(3);
  const [quizCount, setQuizCount] = React.useState(0);
  const [maxQuizCount] = React.useState(quizNumber);
  const [userInput, setUserInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedWeapons, setSubmittedWeapons] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const fetchWeaponList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/weapon");
      if (!response.ok) throw new Error("Failed to fetch weapon list");

      const data = await response.json();

      setWeaponList(data);
    } catch (err) {
      console.error(err);
      setMessage("Error : 데이터를 불러오는데 실패했습니다.");
    }
  };

  const fetchRandomWeapon = () => {
    const availableWeapons = weaponList.filter(
      (weapon) => !submittedWeapons.includes(weapon.Weapon_Name),
    );

    const randomWeapon =
      availableWeapons[Math.floor(Math.random() * availableWeapons.length)];

    setWeapon(randomWeapon);
    setIsSubmitted(false);
    setUserInput("");
    setMessage("");
  };

  React.useEffect(() => {
    fetchWeaponList();
  }, []);

  React.useEffect(() => {
    if (weaponList.length > 0) fetchRandomWeapon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaponList]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userInput.trim().replace(/\s+/g, "").replace(/-/g, "").toLowerCase() ===
      weapon.Weapon_Name.trim()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .toLowerCase()
    ) {
      setScore((score) => score + 1);
      setMessage("정답입니다! 점수가 1점 증가했습니다.");
    } else {
      setMessage(`틀렸습니다. 정답은 ${weapon.Weapon_Name}입니다.`);
      setLife((life) => life - 1);
    }

    setIsSubmitted(true);
    setSubmittedWeapons((prev) => [...prev, weapon?.Weapon_Name]);
  };

  const handleNext = () => {
    setQuizCount((count) => count + 1);
    fetchRandomWeapon();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!weapon) {
    return <div>Loading...</div>;
  }

  if (life < 0 || quizCount >= maxQuizCount) {
    return (
      <div>
        <h3>
          {life < 0 ? "모든 체력을 소모하였습니다." : "모든 문제를 푸셨습니다."}
        </h3>
        <h4>총 문제 수 : {maxQuizCount}</h4>
        <h4>푼 문제 수 : {life < 0 ? quizCount + 1 : quizCount}</h4>
        <h4>맞춘 문제 수 : {score}</h4>
        <h4>남은 생명 : {life < 0 ? 0 : life}</h4>
        <button onClick={handleRestart}>다시 시작하기</button>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {quizCount + 1}. 총기 이름 : {weapon.Weapon_Name}
      </h3>

      <form onSubmit={handleSubmit}>
        <div>이 총기의 이름은 무엇인가요?</div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isSubmitted}
          placeholder="총기 이름 입력"
        />
        <button type="submit" disabled={isSubmitted}>
          제출
        </button>
      </form>

      {message && <div>{message}</div>}

      <h4>
        현재 점수 : {score} | 현재 체력 : {life}
      </h4>
      <h4>총 문제 수 : {maxQuizCount}</h4>

      <button onClick={handleNext} hidden={!isSubmitted}>
        다음 퀴즈
      </button>
    </div>
  );
}

export default Weapon;
