// import './MainViewport.css';
import { Matchup } from "@/lib/interfaces";
import GameView from "./GameView/GameView";
import { GameAbbreviations } from "@/lib/enums";

async function MainViewport({
  game,
  matchupProm,
}: {
  game: GameAbbreviations;
  matchupProm: Promise<Matchup>;
}) {
  return (
    <div className="MainViewport h-full mx-0 bg-zinc-800">
      <GameView game={game} matchupProm={matchupProm} />
    </div>
  );
}

export default MainViewport;
