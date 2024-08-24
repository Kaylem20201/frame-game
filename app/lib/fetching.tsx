'use server';

import { Move } from "./interfaces";
import { gameAbbreviations } from "./enums";

const baseQueryUrl = "https://www.dustloop.com/wiki/index.php?title=Special:CargoExport";
const baseImageUrl = "https://www.dustloop.com/w/Special:FilePath/";
const defaultOptions = [
  ["format", "json"],
  ["order by", ""],
  ["limit", "100"]
];

export async function buildQuery(queryOptions: [string, string][]): Promise<string> {
  let entries = Object.entries(queryOptions).map((it) => it[1]);
  let options = defaultOptions.concat(entries);
  let optionsString = options.map((entry) => {
    let [key, value] = entry;
    return key + "=" + value;
  }).join("&");
  return baseQueryUrl + "&" + optionsString;
}

export async function getCharactersUrl(game: gameAbbreviations) {
  const options: [string, string][] = [];
  const characterTable = game.toLowerCase().concat("Characters");
  options.push(["tables", characterTable]);

  const fields = [
    "name"
  ];
  for (const field of fields) {
    options.push(["fields", characterTable + "." + field]);
  }

  return buildQuery(options);
}

export async function getCharacterList(game: gameAbbreviations): Promise<string[]> {
  // Returns all characters for a certain game
  const url = await getCharactersUrl(game);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.text);
    return [];
  }
  const charObject = await response.json();
  const charNames = [];
  for (const character of charObject) {
    charNames.push(character.name);
  }
  return charNames;
}

export async function getMovesUrl(game: gameAbbreviations, charName: string): Promise<string> {
  const options: [string, string][] = [];
  const moveTable = "MoveData_" + game;
  options.push(["tables", moveTable]);

  const fields = [ //SQL columns
    "input",
    "startup",
    "type",
    "images"
  ];
  options.push(["fields", fields.map((field) => {
    return moveTable + "." + field;
  }).join(',')]);

  const where = [
    "chara = '" + charName + "' AND",
    "startup NOT REGEXP '[^0-9]' AND", //Ensures we don't get moves with complex frame data
    "active > 0 AND",
    "damage > 0 AND", //Get actual attacks
    "images HOLDS LIKE '%_%'" //Must have an image associated
  ]
  options.push(["where", where.map((clause) => {
    return moveTable + "." + clause;
  }).join(' ')]);

  return buildQuery(options);
  //https://www.dustloop.com/wiki/index.php?title=Special:CargoExport&format=json&tables=MoveData_GGST&fields=MoveData_GGST.input,MoveData_GGST.startup,MoveData_GGST.type,MoveData_GGST.images&where=MoveData_GGST.chara%20=%20%27Testament%27%20AND%20MoveData_GGST.startup%20NOT%20REGEXP%20%27[^0-9]%27
}

export async function getCharacterMoves(game: gameAbbreviations, charName: string): Promise<Move[] | undefined> {
  // Returns all moves for a certain character
  const url = await getMovesUrl(game, charName);
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.text);
    return;
  }
  const responseObject = await response.json();
  const moveList: Move[] = [];
  for (const moveData of responseObject) {
    const rawImagePaths: string[] = moveData.images;
    const fullImagePaths = rawImagePaths.map((rawPath) => {
      return baseImageUrl + rawPath;
    })
    const move: Move = {
      startup: moveData.startup,
      input: moveData.input,
      type: moveData.input,
      imagePaths: fullImagePaths
    };
    moveList.push(move);
  }
  return moveList;
}
