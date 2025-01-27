import React from "react";
import "../css/animation.css";

function AnimationTest() {
  const [flippedTiles, setFlippedTiles] = React.useState({});

  const handleMouseEnter = (id) => {
    setFlippedTiles((prev) => ({
      //prev = {1: true 2: false 3: true ...}
      ...prev,
      //prev[id] = !prev[1] = false
      [id]: true,
    }));

    //만약 다시 마우스가 올라가면 이전에 설정한 타이머를 제거
    clearTimeout(flippedTiles[`timer_${id}`]);
  };

  const handleMouseLeave = (id) => {
    //마우스가 떠나면 0.6초 후에 다시 false로 설정
    const timer = setTimeout(() => {
      setFlippedTiles((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 600);

    //타이머를 타일별로 저장
    setFlippedTiles((prev) => ({
      ...prev,
      [`timer_${id}`]: timer,
    }));
  };

  const rows = 7;
  const columns = 15;
  const tileSize = 100;

  return (
    <>
      <div className="page-container">
        <div className="animation-container center">
          <div className="tile-container center">
            {/* 108개의 타일을 생성하고 key를 부여 */}
            {Array.from({ length: rows * columns }, (_, id) => {
              const row = Math.floor(id / columns);
              const col = id % columns;

              return (
                <div
                  key={id}
                  className={"tile-box"}
                  onMouseEnter={() => handleMouseEnter(id)}
                  onMouseLeave={() => handleMouseLeave(id)}
                >
                  <div
                    className={`tile ${flippedTiles[id] ? "flipped" : ""}`}
                    style={{
                      "--row": row,
                      "--col": col,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimationTest;
