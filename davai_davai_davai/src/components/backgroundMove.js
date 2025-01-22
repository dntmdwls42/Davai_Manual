export const backgroundMovement = () => {
  const backgroundImage = document.querySelector(".background-image");
  const backgroundMouseContainer = document.querySelector(
    ".backgroundMouse-container",
  );

  if (!backgroundImage) return;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    console.log("X : " + clientX, "Y : " + clientY);

    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 7;
    const y = (clientY / innerHeight) * 5;

    backgroundImage.style.backgroundPosition = `${-x}% ${-y}%`;
  };

  backgroundMouseContainer.addEventListener("mousemove", handleMouseMove);
};
