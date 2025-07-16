// import './MainViewport.css';
import { Matchup } from "@/lib/interfaces";
import GameView from "./GameView/GameView";
import { GameAbbreviation } from "@/lib/enums";

async function MainViewport({
  game,
  matchupProm,
}: {
  game: GameAbbreviation;
  matchupProm: Promise<Matchup>;
}) {
  return (
    <div className="MainViewport h-screen mx-0 bg-background static">
      <GameView game={game} matchupProm={matchupProm} />
    </div>
  );
}

export default MainViewport;
