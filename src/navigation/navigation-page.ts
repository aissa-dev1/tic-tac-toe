import { INavigationPage } from "./types";

abstract class NavigationPage implements INavigationPage {
  protected _page = this.selectPage();
  protected _pages = document.querySelectorAll(".page");

  abstract render(): void;

  abstract selectPage(): HTMLDivElement;
}

export default NavigationPage;
