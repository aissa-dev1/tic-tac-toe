import NavigationPage from "./navigation-page";

class SettingsPage extends NavigationPage {
  selectPage(): HTMLDivElement {
    const page = document.querySelector<HTMLDivElement>(".settings-page")!;

    return page;
  }

  render(): void {
    this._pages.forEach((page) => page.classList.add("hidden"));

    this._page.classList.remove("hidden");
  }
}

const settingsPage = new SettingsPage();

export default settingsPage;
