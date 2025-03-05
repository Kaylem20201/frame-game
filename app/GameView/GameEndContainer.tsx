import "./GameEndContainer.css";

interface GameEndProps {
  isWinner: boolean;
  resetGame: () => Promise<void>;
}

function GameEndContainer({ isWinner, resetGame }: GameEndProps) {
  return (
    <div className="gameEndContainer">
      <div className="gameEndPopup">
        <h1>{isWinner ? "You win!" : "You lose!"}</h1>
        <div className="resetButton" onClick={resetGame}>
          Reset?
        </div>
      </div>
    </div>
  );
}

export default GameEndContainer;
