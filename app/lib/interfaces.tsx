export interface Player {
  charName: string,
  moveData: Move,
  imgName?: string
}

export interface Move {
  input: string,
  type: string,
  startup: number
}

export interface Matchup {
  player1: Player,
  player2: Player
}
