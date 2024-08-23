'use server';
import { Matchup, Move, Player } from './interfaces';
import { getCharacterList, getCharacterMoves } from './fetching';
import { gameAbbreviations } from './enums';

export async function genNewMatchup(game: gameAbbreviations): Promise<Matchup> {
  const player1prom = genRandomPlayer(game);
  const player2prom = genRandomPlayer(game);
  const [player1, player2] = await Promise.all([player1prom, player2prom]);

  const matchup: Matchup = {
    player1: player1,
    player2: player2
  }

  return matchup;
};

async function genRandomPlayer(game: gameAbbreviations): Promise<Player> {
  const charName = await getRandomCharName(game);
  const move = await getRandomMove(game, charName);

  return {
    charName,
    moveData: move
  }
}

async function getRandomCharName(game: gameAbbreviations): Promise<string> {
  const charNames = await getCharacterList(game);
  const charName = charNames[Math.floor(Math.random() * charNames.length)];
  return charName;
}

async function getRandomMove(game: gameAbbreviations, charName: string): Promise<Move> {
  const charaMoves = await getCharacterMoves(game, charName);
  if (!charaMoves) throw new Error();
  const resultMove = charaMoves[Math.floor(Math.random() * charaMoves.length)];
  return resultMove;
}

