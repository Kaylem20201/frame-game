"use client";

// import './GameView.css'
import { GameState, Matchup } from "@/lib/interfaces";
import { genNewMatchup } from "@/lib/actions";
import { GameAbbreviation, MatchState, PlayerOption } from "@/lib/enums";
import MoveNameContainer from "./MoveNameContainer";
import GameEndContainer from "./GameEndContainer";
import PlayerWindow from "./PlayerWindow";
import { use, useEffect, useState } from "react";
import GameHelp from "./GameHelp";
import { useRouter } from "next/navigation";
import MenuDrawer from "@/components/MenuDrawer";

const initialGameState: GameState = {
  matchState: MatchState.start,
  victor: PlayerOption.na,
  userGuess: PlayerOption.na,
  dustloopGame: GameAbbreviation.Strive,
};

function GameView({
  game,
  matchupProm,
}: {
  game: GameAbbreviation;
  matchupProm: Promise<Matchup>;
}) {
  const router = useRouter();
  const matchup = use(matchupProm);

  const [matchState, setMatchState] = useState(initialGameState.matchState);
  const [victor, setVictor] = useState(initialGameState.victor);
  const [userGuess, setUserGuess] = useState(initialGameState.userGuess);
  const [dustloopGame, setDustloopGame] = useState(game);
  const [isWinner, setWinner] = useState(false);

  useEffect(() => {
    if (matchState === MatchState.start) {
      calculateVictor();
      setMatchState(MatchState.ready);
    }
  }, [matchState, dustloopGame]);

  //When user guesses
  function onUserGuess(userGuess: PlayerOption) {
    if (matchState === MatchState.end) return;
    setMatchState(MatchState.loading);
    setUserGuess(userGuess);
    setWinner(victor === userGuess);
    setMatchState(MatchState.end);
  }

  const resetGame = async (newMatchup?: Matchup) => {
    //Game state is preserved between redirects, hard reset is necessary
    let newGame = newMatchup?.game || game;
    setMatchState(MatchState.start);
    setVictor(initialGameState.victor);
    setUserGuess(initialGameState.userGuess);
    router.push(`/?game=${newGame}`);
  };

  function calculateVictor() {
    const char1startup = matchup?.player1.moveData.startup;
    const char2startup = matchup?.player2.moveData.startup;

    if (!char1startup || !char2startup)
      throw new Error("Invalid calculateVictor call");

    if (char1startup < char2startup) {
      setVictor(PlayerOption.player1);
      return;
    } else if (char2startup < char1startup) {
      setVictor(PlayerOption.player2);
      return;
    } else {
      setVictor(PlayerOption.tie);
      return;
    }
  }

  return (
    <>
      <MenuDrawer game={game} resetGame={resetGame} />
      <section className="h-full flex flex-col justify-stretch">
        <div className="titles text-3xl text-primary text-center w-full font-bold font-sans uppercase">
          <h1>Matchup</h1>
          <div className="versus-flex flex flex-row flex-nowrap justify-center">
            <h2 className="charName basis-5/12">
              {matchup ? matchup.player1.charName.replace(/_/g, " ") : ""}
            </h2>
            <h2 className="versus-title w-min italic"> vs </h2>
            <h2 className="charName basis-5/12">
              {matchup ? matchup.player2.charName.replace(/_/g, " ") : ""}
            </h2>
          </div>
        </div>
        <div className="characterContainer flex-grow flex flex-row flex-nowrap justify-center">
          <div className="playerOne characterWindow basis-1/2 flex flex-col justify-center">
            {matchup ? (
              <PlayerWindow
                player={matchup.player1}
                isGameOver={matchState === MatchState.end}
                victor={victor === PlayerOption.player1}
              />
            ) : null}
          </div>
          <div className="playerTwo characterWindow basis-1/2 flex flex-col justify-center -scale-x-100">
            {matchup ? (
              <PlayerWindow
                player={matchup.player2}
                isGameOver={matchState === MatchState.end}
                victor={victor === PlayerOption.player2}
              />
            ) : null}
          </div>
        </div>
        <div className="interactionContainer text-center h-fit bg-primary-700">
          <GameHelp />
          <GameEndContainer
            isOpen={matchState === MatchState.end}
            isWinner={isWinner}
            matchup={matchup}
            onReset={resetGame}
          />
          <MoveNameContainer
            input1={matchup ? matchup.player1.moveData.input : "Loading"}
            input2={matchup ? matchup.player2.moveData.input : "Loading"}
            onUserGuess={onUserGuess}
          />
        </div>
      </section>
    </>
  );
}

export default GameView;
