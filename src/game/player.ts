import Score from "./score";
import { IPlayer, PlayerType } from "./types";

class Player implements IPlayer {
  private _score = new Score();

  constructor(private _name: string, private _type: PlayerType, private _char: string) {}

  changeName(name: string, defaultName: string) {
    if (name.length < 2) {
      this._name = defaultName;
      return;
    }

    this._name = name;
  }

  changeType(type: PlayerType) {
    this._type = type;
  }

  changeChar(char: string, defaultChar: string) {
    if (char.length <= 0) {
      this._char = defaultChar;
      return;
    }

    this._char = char;
  }

  updateScoreElm(elm: HTMLElement) {
    elm.textContent = this._score.value.toString();
  }

  updateNameElm(elm: HTMLElement) {
    elm.textContent = this._name;
  }

  updateCharElm(elm: HTMLElement) {
    elm.textContent = this._char;
  }

  get score(): Score {
    return this._score;
  }

  get name(): string {
    return this._name;
  }

  get type(): PlayerType {
    return this._type;
  }

  get char(): string {
    return this._char;
  }
}

export default Player;
