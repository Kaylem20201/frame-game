import { Dispatch, SetStateAction } from "react";
import { MatchStates, PlayerOption, GameAbbreviations } from "./enums";

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
  player1: Player;
  player2: Player;
}

export interface GameState {
  matchState: MatchStates;
  victor: PlayerOption;
  userGuess: PlayerOption;
  dustloopGame: GameAbbreviations;
}

export interface ApiResponse {
  code: string;
  content: object;
}

export interface ApiError {
  code: string;
  message: string;
}
