import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";
import Landing from "./pages/landing";
import GamePage from "./pages/gamePage";
import { Routes, Route } from "react-router-dom";
import WinLossPopup from "./components/winLoss";
import RestartGame from "./components/restartGame";
import { useSelector } from "react-redux";

function App() {
  const showRestart = useSelector((state) => state.restartModalIsShowen);
  const showResult = useSelector((state) => state.showResult);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
      {/* <WinLossPopup /> */}
      {/* <Landing /> */}
      {/* <GamePage /> */}
      {showRestart && <RestartGame />}
    </div>
  );
}

export default App;
