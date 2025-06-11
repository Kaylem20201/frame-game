"use client";

// import './GameView.css'
import { GameState, Matchup } from "@/lib/interfaces";
import { genNewMatchup } from "@/lib/actions";
import { GameAbbreviations, MatchStates, PlayerOption } from "@/lib/enums";
import MoveNameContainer from "./MoveNameContainer";
import GameEndContainer from "./GameEndContainer";
import PlayerWindow from "./PlayerWindow";
import { use, useEffect, useState } from "react";
import GameHelp from "./GameHelp";
import { useRouter } from "next/navigation";

const initialGameState: GameState = {
  matchState: MatchStates.start,
  victor: PlayerOption.na,
  userGuess: PlayerOption.na,
  dustloopGame: GameAbbreviations.Strive,
};

function GameView({
  game,
  matchupProm,
}: {
  game: GameAbbreviations;
  matchupProm: Promise<Matchup>;
}) {

  const router = useRouter();
  const matchup = use(matchupProm);

  const [matchState, setMatchState] = useState(initialGameState.matchState);
  const [victor, setVictor] = useState(initialGameState.victor);
  const [userGuess, setUserGuess] = useState(initialGameState.userGuess);
  const [dustloopGame, setDustloopGame] = useState(game);

  useEffect(() => {
    if (matchState === MatchStates.start) {
      setMatchState(MatchStates.ready);
    }
  }, [matchState, dustloopGame]);

  //When user guesses
  function onUserGuess(userGuess: PlayerOption) {
    if (matchState === MatchStates.end) return;
    setMatchState(MatchStates.loading);
    setUserGuess(userGuess);
    calculateVictor();
    setMatchState(MatchStates.end);
  }

  const resetGame = async () => {
    //Game state is preserved between redirects, hard reset is necessary
    setMatchState(MatchStates.start);
    setVictor(initialGameState.victor);
    setUserGuess(initialGameState.userGuess);
    router.push(`/?game=${game}`);
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
    <section className="h-full flex flex-col justify-stretch">
      <div className="titles text-3xl text-red-500 text-center w-full font-bold font-sans uppercase">
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
              victor={victor === PlayerOption.player1 ? true : false}
            />
          ) : null}
        </div>
        <div className="playerTwo characterWindow basis-1/2 flex flex-col justify-center -scale-x-100">
          {matchup ? (
            <PlayerWindow
              player={matchup.player2}
              victor={victor === PlayerOption.player2}
            />
          ) : null}
        </div>
      </div>
      <div className="interactionContainer text-center h-fit bg-rose-700">
        <GameHelp />
        {matchState === MatchStates.end ? (
          <GameEndContainer
            game={game}
            isWinner={userGuess === victor}
            resetGame={resetGame}
          />
        ) : null}
        <MoveNameContainer
          input1={matchup ? matchup.player1.moveData.input : "Loading"}
          input2={matchup ? matchup.player2.moveData.input : "Loading"}
          onUserGuess={onUserGuess}
        />
      </div>
    </section>
  );
}

export default GameView;
