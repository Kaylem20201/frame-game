function MatchupView() {
  return (
    <>
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
      </div>
    </>
  );
}
