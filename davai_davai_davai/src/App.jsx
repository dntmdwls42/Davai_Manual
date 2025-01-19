import Background from "./Background";
import "./css/app.css";

// function App() {
//   const [count, setCount] = React.useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

function App() {
  return (
    <>
      <Background />
      <div id="main-container">
        <div className="title-container center-column">
          <h1 className="main-title">Davai manual</h1>
          <h2 className="sub-title">Minigame of EFT</h2>
        </div>

        <div className="main-btn-container">
          <button className="main-btn">Button 1</button>
          <button className="main-btn">Button 2</button>
          <button className="main-btn">Button 3</button>
        </div>
      </div>
    </>
  );
}

export default App;
