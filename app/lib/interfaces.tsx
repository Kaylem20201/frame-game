export interface Player {
  charName: string;
  moveData: {
    input: string;
    type: string;
  }
  imgName?: string;
}

export interface Matchup {
  player1?: Player,
  player2?: Player
}
