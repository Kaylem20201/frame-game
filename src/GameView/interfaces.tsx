export interface Move { 
  chara : string;
  input : string;
  startup : number | string;
  type : string;
  ?imgName : string;
}

export interface Player {
  charName: string;
  move: Move;
}