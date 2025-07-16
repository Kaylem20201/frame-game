import { Dispatch, SetStateAction } from "react";
import { MatchState, PlayerOption, GameAbbreviation } from "./enums";

export interface Player {
  charName: string;
  moveData: Move;
}

export interface Move {
  input: string;
  type: string;
  startup: number;
  imagePaths: string[];
}

export interface Matchup {
  game: GameAbbreviation,
  player1: Player;
  player2: Player;
}

export interface GameState {
  matchState: MatchState;
  victor: PlayerOption;
  userGuess: PlayerOption;
  dustloopGame: GameAbbreviation;
}

export interface ApiResponse {
  code: string;
  content: object;
}

export interface ApiError {
  code: string;
  message: string;
}
