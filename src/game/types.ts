export type BoardSize = 3 | 4;

export type PlayerType = "player" | "computer";

export interface PlayerChoice {
  name: string;
  char: string;
  position: number;
}

export interface IPlayer {
  get name(): string;
  get type(): PlayerType;
  get char(): string;
}
