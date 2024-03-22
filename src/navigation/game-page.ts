import NavigationPage from "./navigation-page";

class GamePage extends NavigationPage {
  selectPage(): HTMLDivElement {
    const page = document.querySelector<HTMLDivElement>(".game-page")!;

    return page;
  }

  render(): void {
    this._pages.forEach((page) => page.classList.add("hidden"));

    this._page.classList.remove("hidden");
  }
}

const gamePage = new GamePage();

export default gamePage;
