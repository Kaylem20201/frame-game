import './MainViewport.css';
import GameView from "./GameView/GameView";

async function MainViewport() {
  return (
    <div className="MainViewport">
      <GameView />
    </div>
  );
}

export default MainViewport;
