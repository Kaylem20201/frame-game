import './GameView.css'
import { useState } from 'react'
import PlayerWindow from './PlayerWindow.tsx'
import GameHelp from './GameHelp.tsx'
import data from '../assets/data.json'
import { CharData } from './interfaces.tsx'
import MoveNameContainer from './MoveNameContainer.tsx'

function GameView() {
  const [player1, setPlayer1] = useState({ charName: 'Millia_Rage', move: '5P'});
  const [player2, setPlayer2] = useState({ charName: 'Anji_Mito', move: '5P'});
  const [victor, setVictor] = useState(0);
  const [userGuess, setUserGuess] = useState(0);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [isGameStart, setIsGameStart] = useState(true);

  if (isGameStart) {
    setIsGameStart(false);
    const char1 = getRandomCharData();
    const char2 = getRandomCharData();
    const move1 = getRandomMove(char1);
    const move2 = getRandomMove(char2);
  }

  function getRandomCharData() {
    const charData: CharData = data;
    const charNames = Object.keys(charData);
    const charName = charNames[Math.floor(Math.random() * charNames.length)];
    return charData[charName];
  }

  function getRandomMove(charData: CharData) {
    const moveNames = Object.keys(charData.moves);
    const moveName = moveNames[Math.floor(Math.random() * moveNames.length)];
    return charData.moves[moveName as keyof typeof charData.moves];
  }

  if (!isGameEnd && userGuess !== 0) {
    setIsGameEnd(true);
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
    const charData: CharData = data;
    const char1data = charData[player1.charName];
    const char2data = charData[player2.charName];

    const char1startup = char1data.moves[player1.move].startup;
    const char2startup = char2data.moves[player2.move].startup;

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
        <MoveNameContainer char1={player1} char2={player2} userGuess={userGuess} setUserGuess={setUserGuess}/>
        <GameHelp />
      </div>
    </div>
  );
}

export default GameView;