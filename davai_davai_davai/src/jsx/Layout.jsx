import React from "react";
import { Link } from "react-router-dom";
import "../css/layout.css";

function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="layout-container">
        <div className="sidebar-container">
          <div
            className="sidebar"
            style={{
              transform: isSidebarVisible
                ? "translateX(0)"
                : "translateX(-100%)",
            }}
          >
            {/*style의 margin은 아이콘이 가운데에 맞도록 정렬 한 것*/}
            <div className="sidebar_icon center" onClick={handleSidebarToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className={`${isSidebarVisible ? "is-visible" : ""}`}
                style={{ marginRight: "3px" }}
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className={`${isSidebarVisible ? "" : "is-visible"}`}
                style={{ marginLeft: "3px" }}
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </div>
            <div className="sidebar_content max-size">
              <ul>
                <li>
                  <Link to={`/animationTest`}>A</Link>
                </li>
                <li>
                  <Link to={`/`}>B</Link>
                </li>
                <li>
                  <Link to={`/`}>C</Link>
                </li>
                <li>
                  <Link to={`/`}>D</Link>
                </li>
                <li>
                  <Link to={`/Minigame`}>M</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
