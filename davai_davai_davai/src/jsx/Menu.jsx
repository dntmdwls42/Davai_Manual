import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [quizNumber, setQuizNumber] = React.useState(5);

  const handleNumber = (e) => {
    setQuizNumber(e.target.value);
  };

  return (
    <>
      <div className="page-container">
        <h1>Minigame Menu</h1>
        <div className="menu-container">
          <div>
            <label>
              총기 문제 갯수:
              <select value={quizNumber} onChange={handleNumber}>
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={15}>15개</option>
              </select>
            </label>
          </div>

          {/* 선택한 문제 갯수로 Weapon 페이지로 이동 */}
          <Link
            to={`/Minigame/Weapon?number=${quizNumber}`}
            style={{ margin: "10px" }}
          >
            문제 시작
          </Link>
        </div>
        <div className="menu-container">
          <div>
            <label>
              총기 구경 문제 갯수:
              <select value={quizNumber} onChange={handleNumber}>
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={15}>15개</option>
              </select>
            </label>
          </div>

          {/* 선택한 문제 갯수로 Weapon 페이지로 이동 */}
          <Link
            to={`/Minigame/WeaponAndCaliber?number=${quizNumber}`}
            style={{ margin: "10px" }}
          >
            문제 시작
          </Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
