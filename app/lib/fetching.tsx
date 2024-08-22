'use server';

export enum gameAbbreviations {
  Strive = "GGST"
}

const baseUrl = "https://www.dustloop.com/wiki/index.php?title=Special:CargoExport";
const defaultOptions = [
  ["format", "json"],
];

export async function buildQuery(queryOptions: [string, string][]): Promise<string> {
  let entries = Object.entries(queryOptions).map((it) => it[1]);
  let options = defaultOptions.concat(entries);
  let optionsString = options.map((entry) => {
    let [key, value] = entry;
    return key + "=" + value;
  }).join("&");
  return baseUrl + "&" + optionsString;
}

export async function getCharactersUrl(game: gameAbbreviations) {
  // Returns all characters for a certain game
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
