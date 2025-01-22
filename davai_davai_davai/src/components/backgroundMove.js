export const backgroundMovement = () => {
  const backgroundImage = document.querySelector(".background-image");

  const mainContainer = document.querySelector("#main-container");

  if (!backgroundImage) return;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 7;
    const y = (clientY / innerHeight) * 5;

    // CSS의 현재 transform 값(*scale)을 가져오기
    const computedStyle = getComputedStyle(backgroundImage);
    const currentTransform = computedStyle.transform;

    let scaleX = 1.1,
      scaleY = 1.1;

    //matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
    if (currentTransform !== "none") {
      const values = currentTransform.match(/matrix\(([^)]+)\)/)[1].split(", ");

      scaleX = values[0];
      scaleY = values[3];
    }

    // 기존 scale 유지 + 새로운 translate 값 적용
    backgroundImage.style.transform = `scale(${scaleX}, ${scaleY}) translate(${x}px, ${y}px)`;
  };

  mainContainer.addEventListener("mousemove", handleMouseMove);
};
