import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  const [volume, setVolume] = React.useState(0.3);
  const [lastVolume, setLastVolume] = React.useState(0.3);
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (!prev) {
        setLastVolume(volume); // 음소거 전 볼륨 값 저장
        setVolume(0); // 음소거 시 볼륨을 0으로 설정
      } else {
        setVolume(lastVolume); // 음소거 해제 시 기본 볼륨 값으로 복구 (필요에 따라 변경 가능)
      }
      return !prev;
    });
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.valueAsNumber;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setLastVolume(newVolume);
    }
  };

  return (
    <header>
      <div className="header__icon">
        <div className="header__icon--volumecontrol">
          <div
            className="header__icon--volumecontrol--volumetoggle"
            onClick={toggleMute}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#FFFFFF"
              >
                <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
              </svg>
            )}
          </div>
          <input
            type="range"
            step="0.02"
            min="0"
            max="1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              background: `linear-gradient(to right,rgb(117, 117, 117) ${volume * 100}%, 
rgba(33, 33, 33, 0.7) ${volume * 100}%)`,
            }}
          />
        </div>
        <div className="header__icon--home">
          <Link to={`/`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#FFFFFF"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;