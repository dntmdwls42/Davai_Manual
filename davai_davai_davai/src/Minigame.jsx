import React from "react";
import { Outlet } from "react-router-dom";

function Minigame() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          width: "100%",
          height: "100%",
        }}
      >
        <h1>Here is a Minigame Page!</h1>
      </div>
      <Outlet />
    </>
  );
}

export default Minigame;
