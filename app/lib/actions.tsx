'use server';
import move_data from '@/app/assets/move_data.json'
import misc_data from '@/app/assets/misc_data.json'
import { Matchup, Move } from './interfaces';

export async function genNewMatchup(): Promise<Matchup> {
  const charProm1 = getRandomCharName();
  const charProm2 = getRandomCharName();
  const [char1, char2] = await Promise.all([charProm1, charProm2]);

  const moveProm1 = getRandomMove(char1);
  const moveProm2 = getRandomMove(char2);
  const [move1, move2] = await Promise.all([moveProm1, moveProm2]);

  const matchup: Matchup = {
    player1: {
      charName: char1,
      move: move1
    },
    player2: {
      charName: char2,
      move: move2
    }
  }

  return matchup;
};


export async function getRandomCharName(): Promise<string> {
  const charNames: string[] = misc_data.charas;
  const charName = charNames[Math.floor(Math.random() * charNames.length)];
  return charName;
}

export async function getRandomMove(charName: string): Promise<Move> {
  //Get json data from dustloop (https://www.dustloop.com/w/Special:CargoQuery)
  const charaMoves: Move[] = move_data.filter((move) => {
    return (move.chara === charName);
  });
  const resultMove = charaMoves[Math.floor(Math.random() * charaMoves.length)];
  return resultMove;
}

