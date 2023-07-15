

function GameEndPopup(props: {winner: boolean}) {
  return (
    <div className="gameEndPopup">
      <h1>{props.winner ? "You win!" : "You lose!"}</h1>

    </div>
  )
}

export default GameEndPopup;