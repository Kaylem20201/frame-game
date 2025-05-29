import { Dispatch, SetStateAction } from "react";
import { MatchStates, PlayerOption, GameAbbreviations } from "./enums";

export interface Player {
  charName: string;
  moveData: Move;
  imgName?: string;
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
  matchup: Matchup | undefined;
  matchState: MatchStates;
  victor: PlayerOption;
  userGuess: PlayerOption;
  dustloopGame: GameAbbreviations;
}
