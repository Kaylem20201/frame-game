'use client'

import './GameView.css'
import { useState, use, useTransition } from 'react'
import PlayerWindow from './PlayerWindow'
import GameHelp from './GameHelp'
import MoveNameContainer from './MoveNameContainer'
import GameEndContainer from './GameEndContainer'
import { Matchup } from '../lib/interfaces'
import { genNewMatchup } from '../lib/actions'

export enum gameStates {
  start,
  active,
  end
}

const initialGameState: gameStates = gameStates.active
const initialVictor = 0;
const initialUserGuess = 0;
const initialMatchup: Matchup | null = null;

function GameView() {

  const [matchup, setMatchup] = useState(initialMatchup);
  const [gameState, setGameState] = useState(initialGameState);
  const [victor, setVictor] = useState(initialVictor);
  const [userGuess, setUserGuess] = useState(initialUserGuess);

  const [isPending, startTransition] = useTransition();

  function initializeGame() {
    startTransition(async () => {
      setMatchup(await genNewMatchup());
    });
  }

  //When user guesses
  function onUserGuess() {
    if (gameState === gameStates.active && userGuess !== 0) {
      const victor = calculateVictor();
      setVictor(victor);
      if (victor === 0) {
        console.log('Tie!');
      }
      else if (userGuess === victor) {
        console.log('Correct!');
      }
      else {
        console.log('Wrong!');
      }
      setGameState(gameStates.end);
    }
  }

  function calculateVictor() {
    const char1startup = matchup.player1.moveData.startup;
    const char2startup = matchup.player2.moveData.startup;

    if (char1startup < char2startup) {
      return 1;
    }
    else if (char2startup < char1startup) {
      return 2;
    }
    else {
      return 0;
    }
  }

  function isUserWinner() {
    return (victor === userGuess);
  }

  function gameReset() {
    setGameState(gameStates.start);
    setVictor(0);
    setUserGuess(0);
    setMatchup(use(genNewMatchup()));
    setGameState(gameStates.active);
  }

  return (
    <div className="GameView" onLoad={initializeGame} aria-disabled={isPending}>
      <div className="titles">
        <h1>Matchup</h1>
        <div className="versus-flex">
          <h2 className="charName">{(matchup.player1.charName).replace(/_/g, ' ')}</h2>
          <h2 className="versus-title"> vs </h2>
          <h2 className="charName">{(matchup.player2.charName).replace(/_/g, ' ')}</h2>
        </div>
      </div>
      <div className="characterContainer">
        <div className="playerOne characterWindow">
          <PlayerWindow player={matchup.player1} victor={victor == 1 ? true : false} />
        </div>
        <div className="playerTwo characterWindow">
          <PlayerWindow player={matchup.player2} victor={victor == 2 ? true : false} />
        </div>
      </div>
      <div className="interactionContainer">
        {gameState === gameStates.end ? (<GameEndContainer winner={isUserWinner()} gameReset={gameReset} />) : null}
        <MoveNameContainer char1={matchup.player1} char2={matchup.player2} userGuess={userGuess} setUserGuess={setUserGuess} />
        <GameHelp />
      </div>
    </div>
  );
}

export default GameView;
