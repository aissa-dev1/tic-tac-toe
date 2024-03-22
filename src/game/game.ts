import { PlayerChoice } from "./types";
import Board from "./board";
import Player from "./player";
import gamePage from "../navigation/game-page";
import Score from "./score";
import navigationController from "../navigation/navigation-controller";
import soundController from "./sound-controller";
import settings from "./settings";

const gameContainer = gamePage.selectPage();
const player1Score = document.getElementById("player1_score")!;
const player2Score = document.getElementById("player2_score")!;
const tieScoreElm = document.getElementById("tie_score")!;
const player1_name = document.getElementById("player1_name")!;
const player2_name = document.getElementById("player2_name")!;
const player1_char = document.getElementById("player1_char")!;
const player2_char = document.getElementById("player2_char")!;

class TicTacToe {
  private _player1 = new Player("player 1", "player", "x");
  private _player2 = new Player("player 2", "player", "o");
  private _tieScore = new Score();

  private _id = 0;
  private _winner?: Player = undefined;
  private _gameOver = true;
  private _currentPlayer = this._player1;
  private _winOccured = false;
  private _musicThemePlayed = false;

  private _choices: PlayerChoice[] = [];
  private _players: Player[] = [this._player1, this._player2];

  constructor(private _board: Board) {
    this._player1.updateNameElm(player1_name);
    this._player2.updateNameElm(player2_name);
    this._player1.updateCharElm(player1_char);
    this._player2.updateCharElm(player2_char);
    settings.showDarkModeSwitch();
    settings.showGameMusicSwitch();
    settings.showSoundEffectsSwitch();
  }

  startGame() {
    if (!this._gameOver) return;

    const boardContainer = this._board.createBoardContainer(this);

    if (!gameContainer.contains(boardContainer)) {
      gameContainer.appendChild(boardContainer);
    }

    this.resetGame();

    this.animate();
  }

  endGame(winner: Player | undefined) {
    const boardContainer = document.getElementById("board")!;

    this._gameOver = true;

    this._board.disableDraw();

    this._board.fadeCharElm(winner);

    setTimeout(() => {
      this.managePlayResult(winner);

      boardContainer.remove();

      this.startGame();
    }, 1000);
  }

  resetGame() {
    this._gameOver = false;

    this._winOccured = false;

    this._board.allowDraw();

    this._currentPlayer = this._player1;

    this._winner = undefined;

    this._choices = [];
  }

  changeCurrentPlayer(player: Player) {
    this._currentPlayer = player;
  }

  get player1(): Player {
    return this._player1;
  }

  get player2(): Player {
    return this._player2;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  get choices(): PlayerChoice[] {
    return this._choices;
  }

  private checkPlayersTie() {
    if (!this._winOccured && this._choices.length === this._board.size ** 2 && typeof this._winner === "undefined") {
      this.endGame(undefined);
    }
  }

  private checkPlayerWin() {
    this.checkPlayerWinInRows();

    this.checkPlayerWinInColumns();

    this.checkPlayerWinInDiagonals();
  }

  private checkPlayerWinInRows() {
    for (let i = 0; i < this._board.size; i++) {
      const startIndex = i * this._board.size;

      if (this._board.size === 3) {
        for (const player of this._players) {
          if (
            this.playerWinCondition(startIndex, player.char) &&
            this.playerWinCondition(startIndex + 1, player.char) &&
            this.playerWinCondition(startIndex + 2, player.char)
          ) {
            this._winOccured = true;

            this.endGame(player);
          }
        }
      }

      if (this._board.size === 4) {
        for (const player of this._players) {
          if (
            this.playerWinCondition(startIndex, player.char) &&
            this.playerWinCondition(startIndex + 1, player.char) &&
            this.playerWinCondition(startIndex + 2, player.char) &&
            this.playerWinCondition(startIndex + 3, player.char)
          ) {
            this._winOccured = true;

            this.endGame(player);
          }
        }
      }
    }
  }

  private checkPlayerWinInColumns() {
    for (let i = 0; i < this._board.size; i++) {
      if (this._board.size === 3) {
        for (const player of this._players) {
          if (
            this.playerWinCondition(i, player.char) &&
            this.playerWinCondition(i + 3, player.char) &&
            this.playerWinCondition(i + 6, player.char)
          ) {
            this._winOccured = true;

            this.endGame(player);
          }
        }
      }

      if (this._board.size === 4) {
        for (const player of this._players) {
          if (
            this.playerWinCondition(i, player.char) &&
            this.playerWinCondition(i + 4, player.char) &&
            this.playerWinCondition(i + 8, player.char) &&
            this.playerWinCondition(i + 12, player.char)
          ) {
            this._winOccured = true;

            this.endGame(player);
          }
        }
      }
    }
  }

  private checkPlayerWinInDiagonals() {
    this.checkPlayerWinInMainDiagonal();

    this.checkPlayerWinInAntiDiagonal();
  }

  private checkPlayerWinInMainDiagonal() {
    const startIndex = 0;

    if (this._board.size === 3) {
      for (const player of this._players) {
        if (
          this.playerWinCondition(startIndex, player.char) &&
          this.playerWinCondition(startIndex + 4, player.char) &&
          this.playerWinCondition(startIndex + 8, player.char)
        ) {
          this._winOccured = true;

          this.endGame(player);
        }
      }

      return;
    }

    for (const player of this._players) {
      if (
        this.playerWinCondition(startIndex, player.char) &&
        this.playerWinCondition(startIndex + 5, player.char) &&
        this.playerWinCondition(startIndex + 10, player.char) &&
        this.playerWinCondition(startIndex + 15, player.char)
      ) {
        this._winOccured = true;

        this.endGame(player);
      }
    }
  }

  private checkPlayerWinInAntiDiagonal() {
    if (this._board.size === 3) {
      const startIndex = 2;

      for (const player of this._players) {
        if (
          this.playerWinCondition(startIndex, player.char) &&
          this.playerWinCondition(startIndex + 2, player.char) &&
          this.playerWinCondition(startIndex + 4, player.char)
        ) {
          this._winOccured = true;

          this.endGame(player);
        }
      }

      return;
    }

    const startIndex = 3;

    for (const player of this._players) {
      if (
        this.playerWinCondition(startIndex, player.char) &&
        this.playerWinCondition(startIndex + 3, player.char) &&
        this.playerWinCondition(startIndex + 6, player.char) &&
        this.playerWinCondition(startIndex + 9, player.char)
      ) {
        this._winOccured = true;

        this.endGame(player);
      }
    }
  }

  private playerWinCondition(index: number, char: string): boolean {
    const boardContainer = document.getElementById("board")!;

    return boardContainer.children[index].getAttribute("data-char") === char;
  }

  private managePlayResult(winner: Player | undefined) {
    if (typeof winner !== "undefined") {
      this._winner = winner;

      this._winner.score.increase();

      if (settings.soundEffects) {
        soundController.play(soundController.winSound);
      }

      return;
    }

    this._tieScore.increase();

    if (settings.soundEffects) {
      soundController.play(soundController.tieSound);
    }
  }

  private updateTieScore() {
    tieScoreElm.textContent = this._tieScore.value.toString();
  }

  private playMusicTheme() {
    if (!settings.gameMusic) {
      soundController.gameThemeSound.currentTime = 0;
      return;
    }

    if (navigationController.currentPage !== gamePage) {
      soundController.pauseGameThemeSound();
      return;
    }

    if (!this._musicThemePlayed) {
      soundController.playGameThemeSound();
    }
  }

  private animate() {
    if (this._gameOver) {
      cancelAnimationFrame(this._id);
      return;
    }

    this._board.startBoardRGB(document.getElementById("board") as HTMLDivElement);

    this._board.startCharElmRGB();

    this.checkPlayerWin();

    this.checkPlayersTie();

    this._player1.updateScoreElm(player1Score);

    this._player2.updateScoreElm(player2Score);

    this.updateTieScore();

    this.playMusicTheme();

    this._id = requestAnimationFrame(this.animate.bind(this));
  }
}

export default TicTacToe;
