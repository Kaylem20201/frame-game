import { Dispatch, SetStateAction } from "react"
import { matchStates, PlayerOption } from "../GameView/GameView"
import { gameAbbreviations } from "./enums"

export interface Player {
  charName: string,
  moveData: Move,
  imgName?: string
}

export interface Move {
  input: string,
  type: string,
  startup: number,
  imagePaths: string[]
}

export interface Matchup {
  player1: Player,
  player2: Player
}

export interface GameState {
  matchup: Matchup | undefined,
  matchState: matchStates,
  victor: PlayerOption,
  userGuess: PlayerOption,
  setUserGuess: Dispatch<SetStateAction<PlayerOption>>,
  dustloopGame: gameAbbreviations,
  resetFn: () => void
}
