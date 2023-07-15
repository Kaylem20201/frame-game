export interface CharData { // derived from src/assets/charData.json
  [charName: string]: {
    'moves': {
      [moveName: string]: {
        'startup': number;
      }
    },
    'wikiLink': string;
  }
}

export interface Player {
  charName: string;
  move: string;
}