"use server";
import { Matchup, Move, Player } from "./interfaces";
import { getCharacterList, getCharacterMoves } from "./fetching";
import { GameAbbreviations } from "./enums";

/**
 * Returns a Matchup for the specified game
 * @param {GameAbbreviations} game - Game to generate a matchup from
 * @returns {Promise<Matchup>}
 */
export async function genNewMatchup(game: GameAbbreviations): Promise<Matchup> {
  const player1prom = genRandomPlayer(game);
  const player2prom = genRandomPlayer(game);
  const [player1, player2] = await Promise.all([player1prom, player2prom]);

  const matchup: Matchup = {
    player1: player1,
    player2: player2,
  };

  return matchup;
}

/**
 * Returns a random Player object for the specified game
 * @param {GameAbbreviations} game - Game to generate a matchup from
 * @returns {Promise<Player>}
 */
export async function genRandomPlayer(game: GameAbbreviations): Promise<Player> {
  let charName, move;
  let rerolls = 0;
  while (true) {
    charName = await getRandomCharName(game);
    move = await getRandomMove(game, charName);
    if (charName !== undefined && move !== undefined) break;
    rerolls += 1;
    if (rerolls >= 10) throw new Error("Error with Dustloop API");
  }

  return {
    charName,
    moveData: move,
  };
}

/**
 * Returns a random Character for the specified game
 * @param {GameAbbreviations} game - Game to generate a matchup from
 * @returns {Promise<string>}
 */
export async function getRandomCharName(game: GameAbbreviations): Promise<string> {
  const charNames = await getCharacterList(game);
  const charName = charNames[Math.floor(Math.random() * charNames.length)];
  return charName;
}

/**
 * Returns a random move for the specified character
 * @param {GameAbbreviations} game - Game to generate a matchup from
 * @param {string} charName - Character who the move belongs to
 * @returns {Promise<Move | undefined>}
 */
export async function getRandomMove(
  game: GameAbbreviations,
  charName: string,
): Promise<Move | undefined> {
  const charaMoves = await getCharacterMoves(game, charName);
  if (!charaMoves) return undefined;
  const resultMove = charaMoves[Math.floor(Math.random() * charaMoves.length)];
  return resultMove;
}
