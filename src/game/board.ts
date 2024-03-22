import { BoardSize } from "./types";
import TicTacToe from "./game";
import Player from "./player";
import soundController from "./sound-controller";
import settings from "./settings";

class Board {
  private _startAnimation = false;
  private _allowDraw = true;
  private _styleId = 0;
  private _accentColor = "#C3AED6";
  private _colorPercentage = 100;
  private _colorState = "decrease";
  private _boardColorPosition = "right";
  private _charColorPosition = "top";

  constructor(private _width: number, private _height: number, private _size: BoardSize) {}

  createBoardContainer(game: TicTacToe): HTMLDivElement {
    const boardContainer = document.createElement("div");

    this.renderBoardCells(game, boardContainer);

    this.manageBoardStyling(boardContainer);

    return boardContainer;
  }

  changeBoardSize(game: TicTacToe, size: BoardSize) {
    const boardContainer = document.getElementById("board") as HTMLDivElement;

    boardContainer.textContent = "";

    this._size = size;

    this.renderBoardCells(game, boardContainer);

    this.manageBoardStyling(boardContainer);
  }

  startBoardRGB(boardContainer: HTMLDivElement) {
    if (settings.darkMode) {
      boardContainer.style.backgroundImage = `linear-gradient(to ${this._boardColorPosition}, #1a1a1a 0%, ${this._accentColor} ${this._colorPercentage}%)`;
    } else {
      boardContainer.style.backgroundImage = `linear-gradient(to ${this._boardColorPosition}, #f2f2f2 0%, ${this._accentColor} ${this._colorPercentage}%)`;
    }

    if (this._colorState === "decrease") {
      this._colorPercentage--;

      if (this._colorPercentage === 0) {
        this._colorState = "increase";

        switch (this._boardColorPosition) {
          case "right":
            this._boardColorPosition = "left";
            break;

          case "left":
            this._boardColorPosition = "right";
            break;

          default:
            this._boardColorPosition = "right";
        }
      }
    } else {
      this._colorPercentage++;

      if (this._colorPercentage === 100) {
        this._colorState = "decrease";
      }
    }
  }

  startCharElmRGB() {
    const boardContainer = document.getElementById("board");

    if (boardContainer === null) return;

    for (let i = 0; i < boardContainer.children.length; i++) {
      const boardCell = boardContainer.children[i];

      const choice = boardCell.children[0] as HTMLElement;

      if (typeof choice === "undefined") continue;

      choice.style.color = "transparent";
      choice.style.backgroundImage = `linear-gradient(to ${this._charColorPosition}, ${this._accentColor} 0%, #f2f2f2 ${this._colorPercentage}%)`;
      choice.style.backgroundClip = "text";
    }

    if (this._colorPercentage === 0) {
      switch (this._charColorPosition) {
        case "top":
          this._charColorPosition = "bottom";
          break;

        case "bottom":
          this._charColorPosition = "top";
          break;

        default:
          this._charColorPosition = "top";
      }
    }
  }

  fadeCharElm(winner: Player | undefined) {
    const boardContainer = document.getElementById("board");

    if (boardContainer === null) return;

    for (let i = 0; i < boardContainer.children.length; i++) {
      const boardCell = boardContainer.children[i] as HTMLDivElement;

      if (typeof winner === "undefined") {
        boardCell.children[0].classList.add("signal");
        continue;
      }

      if (!boardCell.hasAttribute("data-char") || boardCell.dataset.char !== winner.char) continue;

      boardCell.children[0].classList.add("signal");
    }
  }

  allowDraw() {
    this._allowDraw = true;
  }

  disableDraw() {
    this._allowDraw = false;
  }

  changeAccentColor(color: string) {
    this._accentColor = color;
  }

  private manageBoardStyling(boardContainer: HTMLDivElement) {
    clearInterval(this._styleId);
    this._colorState = "decrease";

    boardContainer.style.width = `${this._width}px`;
    boardContainer.style.height = `${this._height}px`;
    boardContainer.style.padding = "10px";

    boardContainer.style.display = "grid";
    boardContainer.style.gridTemplateColumns = `repeat(${this._size}, 1fr)`;
    boardContainer.style.gap = "10px";

    boardContainer.style.position = "absolute";
    boardContainer.style.top = "50%";
    boardContainer.style.left = "50%";
    boardContainer.style.transform = "translate(-50%, -50%)";

    boardContainer.setAttribute("id", "board");
    boardContainer.classList.add("board");
  }

  private renderBoardCells(game: TicTacToe, boardContainer: HTMLDivElement) {
    for (let i = 0; i < this._size ** 2; i++) {
      const boardCell = this.createBoardCell(game, i);

      if (!this._startAnimation) {
        boardContainer.appendChild(boardCell);
        continue;
      }

      setTimeout(() => {
        boardContainer.appendChild(boardCell);
      }, 150 * i);
    }
  }

  private createBoardCell(game: TicTacToe, index: number): HTMLDivElement {
    const boardCell = document.createElement("div");

    boardCell.style.position = "relative";
    boardCell.style.cursor = "pointer";

    boardCell.addEventListener("click", () => {
      this.boardCellClick(game, boardCell, index);
    });

    return boardCell;
  }

  private boardCellClick(game: TicTacToe, boardCell: HTMLDivElement, index: number) {
    if (boardCell.hasAttribute("data-char") || !this._allowDraw) return;

    boardCell.appendChild(this.createCharElm(game.currentPlayer.char));

    boardCell.dataset.char = game.currentPlayer.char;

    game.choices.push({ name: game.currentPlayer.name, char: game.currentPlayer.char, position: index });

    if (settings.soundEffects) {
      soundController.play(soundController.chooseSound);
    }

    if (game.currentPlayer === game.player1) {
      game.changeCurrentPlayer(game.player2);
      return;
    }

    game.changeCurrentPlayer(game.player1);
  }

  private createCharElm(content: string): HTMLParagraphElement {
    const choice = document.createElement("p");

    choice.textContent = content;

    choice.style.position = "absolute";
    choice.style.top = "50%";
    choice.style.left = "50%";
    choice.style.transform = "translate(-50%, -50%)";

    choice.style.fontSize = "50px";
    choice.style.textTransform = "uppercase";

    return choice;
  }

  get size(): BoardSize {
    return this._size;
  }
}

export default Board;
