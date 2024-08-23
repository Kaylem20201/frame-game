'use client'

import './GameView.css'
import { useState, use, useTransition, useEffect } from 'react'
import GameHelp from './GameHelp'
import { GameState, Matchup } from '../lib/interfaces'
import { genNewMatchup } from '../lib/actions'
import { gameAbbreviations } from '@/app/lib/enums'
import { MatchupView } from './MatchupView'

export enum matchStates {
  start,
  active,
  end
}

export enum PlayerOption {
  player1,
  player2,
  na
}

export enum GuessState {
  correct,
  incorrect,
  na
}

const initialMatchState: matchStates = matchStates.active
const initialVictor = PlayerOption.na;
const initialUserGuess = PlayerOption.na;
const initialMatchup: Matchup | undefined = undefined;
const initialDustloopGame: gameAbbreviations = gameAbbreviations.Strive;

function GameView() {

  console.log("Hi!");

  const [matchup, setMatchup] = useState(initialMatchup);
  const [matchState, setMatchState] = useState(initialMatchState);
  const [victor, setVictor] = useState(initialVictor);
  const [userGuess, setUserGuess] = useState(initialUserGuess);
  const [dustloopGame, setDustloopGame] = useState(initialDustloopGame);

  useEffect(() => {
    initializeGame();
  })

  function initializeGame() {
    console.log("Initializing game...");
    gameReset();
  }

  //When user guesses
  function onUserGuess() {
    if (matchState === matchStates.active && userGuess !== PlayerOption.na) {
      const victor = calculateVictor();
      setVictor(victor);
      if (victor === PlayerOption.na) {
        console.log('Tie!');
      }
      else if (userGuess === victor) {
        console.log('Correct!');
      }
      else {
        console.log('Wrong!');
      }
      setMatchState(matchStates.end);
    }
  }

  function calculateVictor() {
    const char1startup = matchup?.player1.moveData.startup;
    const char2startup = matchup?.player2.moveData.startup;

    if (!char1startup || !char2startup) return PlayerOption.na;

    if (char1startup < char2startup) {
      return PlayerOption.player1;
    }
    else if (char2startup < char1startup) {
      return PlayerOption.player2;
    }
    else {
      return PlayerOption.na;
    }
  }

  const gameReset = async () => {
    setMatchState(matchStates.start);
    setVictor(0);
    setUserGuess(0);
    setMatchup(await genNewMatchup(dustloopGame));
    setMatchState(matchStates.active);
  }

  const gameState: GameState = {
    matchup,
    matchState,
    victor,
    userGuess,
    setUserGuess,
    dustloopGame,
    resetFn: gameReset
  }


  return (
    <div className="GameView" onLoad={initializeGame} >
      <MatchupView {...gameState} />
      <GameHelp />
    </div>
  );
}

export default GameView;
