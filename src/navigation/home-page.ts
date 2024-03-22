import NavigationPage from "./navigation-page";

class HomePage extends NavigationPage {
  selectPage(): HTMLDivElement {
    const page = document.querySelector<HTMLDivElement>(".home-page")!;

    return page;
  }

  render(): void {
    this._pages.forEach((page) => page.classList.add("hidden"));

    this._page.classList.remove("hidden");
  }
}

const homePage = new HomePage();

export default homePage;
