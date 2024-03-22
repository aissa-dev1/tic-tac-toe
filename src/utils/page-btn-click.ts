import navigationController from "../navigation/navigation-controller";
import NavigationPage from "../navigation/navigation-page";
import soundController from "../game/sound-controller";
import settings from "../game/settings";

function pageBtnClick(btns: NodeListOf<Element>, page: NavigationPage, callback?: () => void) {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navigationController.changePage(page);

      navigationController.currentPage.render();

      if (settings.soundEffects) {
        soundController.play(soundController.tapSound);
      }
    });
  });

  if (callback) {
    callback();
  }
}

export default pageBtnClick;
