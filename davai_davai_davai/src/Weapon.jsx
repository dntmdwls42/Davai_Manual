import React from "react";

function Weapon() {
  const [weapon, setWeapon] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [life, setLife] = React.useState(3);
  const [userInput, setUserInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const fetchRandomWeapon = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/weapon");
      if (!response.ok) throw new Error("Failed to fetch weapon list");

      const data = await response.json();
      setWeapon(data);
      setIsSubmitted(false);
      setUserInput("");
      setMessage("");
    } catch (err) {
      setMessage("Error : 데이터를 불러오는데 실패했습니다.");
    }
  };

  React.useEffect(() => {
    fetchRandomWeapon();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userInput.trim().replace(/\s+/g, "").toLowerCase() ===
      weapon.Weapon_Name.trim().replace(/\s+/g, "").toLowerCase()
    ) {
      setScore((score) => score + 1);
      setMessage("정답입니다! 점수가 1점 증가했습니다.");
    } else {
      setMessage(`틀렸습니다. 정답은 ${weapon.Weapon_Name}입니다.`);
      setLife((life) => life - 1);
    }

    setIsSubmitted(true);
  };

  const handleNext = () => {
    fetchRandomWeapon();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!weapon) {
    return <div>Loading...</div>;
  }

  if (life < 0) {
    return (
      <div>
        <h3>모든 체력을 소모하였습니다.</h3>
        <h4>최종 점수 : {score}</h4>
        <button onClick={handleRestart}>다시 시작하기</button>
      </div>
    );
  }

  return (
    <div>
      <h3>총기 이름 : {weapon.Weapon_Name}</h3>

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

      <button onClick={handleNext} hidden={!isSubmitted}>
        다음 퀴즈
      </button>
    </div>
  );
}

export default Weapon;
