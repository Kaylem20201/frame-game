import './GameEndContainer.css';

function GameEndContainer(props: {
  winner: boolean, 
  gameReset : () => void
}) {  

  return (
    <div className="gameEndContainer">
      <div className="gameEndPopup">
        <h1>{props.winner ? "You win!" : "You lose!"}</h1>
        <div className="resetButton" onClick={props.gameReset}>Reset?</div>
      </div>
    </div>
  )
}

export default GameEndContainer;