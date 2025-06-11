import { GameAbbreviations } from "@/lib/enums";
import "./GameEndContainer.css";
import Link from "next/link";

interface GameEndProps {
  game: GameAbbreviations;
  isWinner: boolean;
  resetGame: () => Promise<void>;
}

function GameEndContainer({ game, isWinner, resetGame }: GameEndProps) {
  return (
    <div className="gameEndContainer">
      <div className="gameEndPopup">
        <h1>{isWinner ? "You win!" : "You lose!"}</h1>
        <Link href={`/?game=${game}`}>
          <div className="resetButton" onClick={resetGame}>
            Reset?
          </div>
        </Link>
      </div>
    </div>
  );
}

export default GameEndContainer;
