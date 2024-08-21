export interface Player {
  charName: string;
  moveData: {
    input: string;
    type: string;
    startup: number;
  }
  imgName?: string;
}

export interface Matchup {
  player1: Player,
  player2: Player
}
