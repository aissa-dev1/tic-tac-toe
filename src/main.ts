import Board from "./game/board";
import TicTacToe from "./game/game";
import { BoardSize } from "./game/types";
import gamePage from "./navigation/game-page";
import homePage from "./navigation/home-page";
import settingsPage from "./navigation/settings-page";
import pageBtnClick from "./utils/page-btn-click";

const toHomePageBtns = document.querySelectorAll(".to-home-page");
const toGamePageBtns = document.querySelectorAll(".to-game-page");
const toSettingsPageBtns = document.querySelectorAll(".to-settings-page");
const boardSizeSelect = document.getElementById("board_size") as HTMLSelectElement;
const player1NameInput = document.getElementById("player1_name_input") as HTMLInputElement;
const player1CharInput = document.getElementById("player1_char_input") as HTMLInputElement;
const player2NameInput = document.getElementById("player2_name_input") as HTMLInputElement;
const player2CharInput = document.getElementById("player2_char_input") as HTMLInputElement;
const colors = document.querySelectorAll<HTMLDivElement>(".color");

const board = new Board(500, 500, 3);

const game = new TicTacToe(board);

document.addEventListener("DOMContentLoaded", () => {
  pageBtnClick(toHomePageBtns, homePage);
  pageBtnClick(toSettingsPageBtns, settingsPage);
  pageBtnClick(toGamePageBtns, gamePage, () => {
    game.startGame();
  });
});

boardSizeSelect.addEventListener("change", () => {
  board.changeBoardSize(game, parseInt(boardSizeSelect.value) as BoardSize);
});

player1NameInput.addEventListener("input", () => {
  game.player1.changeName(player1NameInput.value.slice(0, 8), "player 1");
  game.player1.updateNameElm(document.getElementById("player1_name")!);
});

player2NameInput.addEventListener("input", () => {
  game.player2.changeName(player2NameInput.value.slice(0, 8), "player 2");
  game.player2.updateNameElm(document.getElementById("player2_name")!);
});

player1CharInput.addEventListener("input", () => {
  game.player1.changeChar(player1CharInput.value.slice(0, 1), "x");
  game.player1.updateCharElm(document.getElementById("player1_char")!);
});

player2CharInput.addEventListener("input", () => {
  game.player2.changeChar(player2CharInput.value.slice(0, 1), "o");
  game.player2.updateCharElm(document.getElementById("player2_char")!);
});

colors.forEach((color) => {
  color.addEventListener("click", () => {
    colors.forEach((color) => color.classList.remove("active"));

    board.changeAccentColor(color.dataset.color!);

    color.classList.add("active");
  });
});
