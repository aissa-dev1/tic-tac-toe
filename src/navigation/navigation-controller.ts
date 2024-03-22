import homePage from "./home-page";
import NavigationPage from "./navigation-page";

class NavigationController {
  private _currentPage: NavigationPage = homePage;

  constructor() {
    this.currentPage.render();
  }

  changePage(page: NavigationPage) {
    this._currentPage = page;

    this._currentPage.render();
  }

  get currentPage(): NavigationPage {
    return this._currentPage;
  }
}

const navigationController = new NavigationController();

export default navigationController;
