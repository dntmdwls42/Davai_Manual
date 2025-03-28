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
      <div className="page-container">
        {/* page container 에서 궁금한 점 -> jsx와 css의 구조를 저렇게 그냥 냅둬도 됨?
        그러니까 정확히는 부모가 누구인지 jsx와 css 폴더를 따로 나눠야되는거아님?
        한눈에 안들어와서 부모가 누구고 자식은 누구고가 한눈에 들어오지 않아서 매번
        뒤져봐야되는 시간이 들어가는데 이게 "원래" 프로젝트 진행 방식이 이런지 모르겠음
        
        내 생각엔 따로 나누어도 될것같긴한데 물론 경로는 재지정해 주어야 겠지만..
        
        아 맞다 파일 이름도 좀 통일하고 (main,menu,app 등의 이름을 뭐 app같으면 quiz selection page 같은
        예로 변경해도 됨?) 혹시 app이란 이름이 반드시 react에서는 정리해야 되나?*/}
        <div className="minigame-menu">
          <h1 className="minigame-menu__title">총기 퀴즈 선택</h1>
          {/* 아래에 삽입된 이미지는 임시임. */}
          <img
            className="minigame-menu__quiz-hint-image"
            src="/image/USEC-gun-aiming.webp"
            alt="USEC-gun-aiming"
          />
          <div className="menu-container">
            <div>
              <label className="mimigame-menu__quiz__selector">
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
              <label className="mimigame-menu__quiz__selector">
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
      </div>
    </>
  );
}

export default Menu;
