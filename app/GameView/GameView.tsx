'use client'

import './GameView.css'
import { useState } from 'react'
import PlayerWindow from './PlayerWindow'
import GameHelp from './GameHelp'
import move_data from '../assets/move_data.json'
import misc_data from '../assets/misc_data.json'
import { Move } from './interfaces'
import MoveNameContainer from './MoveNameContainer'
import GameEndContainer from './GameEndContainer'

export enum gameStates {
  start,
  active,
  end
}

function GameView() {

  //const char1 = getRandomCharName();
  const char1 = "Anji Mito";
  const char2 = "Millia Rage";
  //const char2 = getRandomCharName();
  const [player1, setPlayer1] = useState({ charName: char1, move: getRandomMove(char1) });
  const [player2, setPlayer2] = useState({ charName: char2, move: getRandomMove(char2) });
  const [victor, setVictor] = useState(0);
  const [userGuess, setUserGuess] = useState(0);
  const [gameState, setGameState] = useState(gameStates.active);

  if (gameState === gameStates.start) {
    //Randomly pick a character for each side
    //Get move data for each character
    //Randomly pick a move for each character
    setGameState(gameStates.active);
    const char1 = getRandomCharName();
    const char2 = getRandomCharName();
    const move1 = getRandomMove(char1);
    const move2 = getRandomMove(char2);
    setPlayer1({ charName: char1, move: move1 });
    setPlayer2({ charName: char2, move: move2 });
  }

  function getRandomCharName() {
    const charNames: string[] = misc_data.charas;
    const charName = charNames[Math.floor(Math.random() * charNames.length)];
    return charName;
  }

  function getRandomMove(charName: string): Move {
    //Get json data from dustloop (https://www.dustloop.com/w/Special:CargoQuery)
    const charaMoves: Move[] = move_data.filter((move) => {
      return (move.chara === charName);
    });
    const resultMove = charaMoves[Math.floor(Math.random() * charaMoves.length)];
    return resultMove;
  }

  //When user guesses
  if (gameState === gameStates.active && userGuess !== 0) {
    setGameState(gameStates.end);
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
  }

  function calculateVictor() {
    const char1startup = player1.move.startup;
    const char2startup = player2.move.startup;

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
  }

  return (
    <div className="GameView">
      <div className="titles">
        <h1>Matchup</h1>
        <div className="versus-flex">
          <h2 className="charName">{(player1.charName).replace(/_/g, ' ')}</h2>
          <h2 className="versus-title"> vs </h2>
          <h2 className="charName">{(player2.charName).replace(/_/g, ' ')}</h2>
        </div>
      </div>
      <div className="characterContainer">
        <div className="playerOne characterWindow">
          <PlayerWindow player={player1} victor={victor == 1 ? true : false} />
        </div>
        <div className="playerTwo characterWindow">
          <PlayerWindow player={player2} victor={victor == 2 ? true : false} />
        </div>
      </div>
      <div className="interactionContainer">
        {gameState === gameStates.end ? (<GameEndContainer winner={isUserWinner()} gameReset={gameReset} />) : null}
        <MoveNameContainer char1={player1} char2={player2} userGuess={userGuess} setUserGuess={setUserGuess} />
        <GameHelp />
      </div>
    </div>
  );
}

export default GameView;
