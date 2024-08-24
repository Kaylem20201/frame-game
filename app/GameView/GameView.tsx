'use client'

import './GameView.css'
import { GameState } from '../lib/interfaces'
import { genNewMatchup } from '../lib/actions'
import { GameAbbreviations, MatchStates, PlayerOption } from '../lib/enums';
import MoveNameContainer from './MoveNameContainer';
import GameEndContainer from './GameEndContainer';
import PlayerWindow from './PlayerWindow';
import { useActionState, useEffect, useState } from 'react';

const initialGameState: GameState = {
  matchup: undefined,
  matchState: MatchStates.start,
  victor: PlayerOption.na,
  userGuess: PlayerOption.na,
  dustloopGame: GameAbbreviations.Strive
}

function GameView() {

  console.log("Hi!");

  const [matchup, setMatchup] = useState(initialGameState.matchup);
  const [matchState, setMatchState] = useState(initialGameState.matchState);
  const [victor, setVictor] = useState(initialGameState.victor);
  const [userGuess, setUserGuess] = useState(initialGameState.userGuess);
  const [dustloopGame, setDustloopGame] = useState(initialGameState.dustloopGame);

  useEffect(() => {
    if (matchState === MatchStates.start) {
      setMatchState(MatchStates.loading);
      genNewMatchup(dustloopGame).then((matchup) => {
        setMatchup(matchup);
        setVictor(PlayerOption.na);
        setUserGuess(PlayerOption.na);
      });
      setMatchState(MatchStates.active);
    }
  }, [matchState])


  //When user guesses
  function onUserGuess(userGuess: PlayerOption) {
    setMatchState(MatchStates.loading);
    setUserGuess(userGuess);
    calculateVictor();
    setMatchState(MatchStates.end);
  }

  const resetGame = async () => {
    setMatchState(MatchStates.start);
  }

  function calculateVictor() {

    const char1startup = matchup?.player1.moveData.startup;
    const char2startup = matchup?.player2.moveData.startup;

    if (!char1startup || !char2startup) throw new Error("Invalid calculateVictor call");

    if (char1startup < char2startup) {
      setVictor(PlayerOption.player1);
      return;
    }
    else if (char2startup < char1startup) {
      setVictor(PlayerOption.player2);
      return;
    }
    else {
      setVictor(PlayerOption.tie);
      return;
    }
  }

  return (
    <>
      {matchState === MatchStates.loading ? "Loading" : <>
        <div className="titles">
          <h1>Matchup</h1>
          <div className="versus-flex">
            <h2 className="charName">{matchup ? (matchup.player1.charName).replace(/_/g, ' ') : ''}</h2>
            <h2 className="versus-title"> vs </h2>
            <h2 className="charName">{matchup ? (matchup.player2.charName).replace(/_/g, ' ') : ''}</h2>
          </div>
        </div>
        <div className="characterContainer">
          <div className="playerOne characterWindow">
            {matchup ? <PlayerWindow player={matchup.player1} victor={(victor === PlayerOption.player1) ? true : false} /> : null}
          </div>
          <div className="playerTwo characterWindow">
            {matchup ? <PlayerWindow player={matchup.player2} victor={victor === PlayerOption.player2} /> : null}
          </div>
        </div>
        <div className="interactionContainer">
          {matchState === MatchStates.end ? (<GameEndContainer isWinner={userGuess === victor} resetGame={resetGame} />) : null}
          <MoveNameContainer input1={matchup?.player1.moveData.input} input2={matchup?.player2.moveData.input} onUserGuess={onUserGuess} />
        </div> </>
      }
    </>
  );
}

export default GameView;
