// import './MainViewport.css';
import GameView from "./GameView/GameView";

async function MainViewport() {
  return (
    <div className="MainViewport h-full mx-0 bg-zinc-800">
      <GameView />
    </div>
  );
}

export default MainViewport;
