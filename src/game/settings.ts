import createSwitch from "../utils/create-switch";

const darkModeWrapper = document.querySelector(".dark-mode-wrapper")!;
const gameMusicWrapper = document.querySelector(".game-music-wrapper")!;
const soundEffectsWrapper = document.querySelector(".sound-effects-wrapper")!;

class Settings {
  private _darkMode = false;
  private _gameMusic = true;
  private _soundEffects = true;

  private _darkModeSwitch = createSwitch(this._darkMode);
  private _gameMusicSwitch = createSwitch(this._gameMusic);
  private _soundEffectsSwitch = createSwitch(this._soundEffects);

  constructor() {
    this._darkModeSwitch.input.addEventListener("click", () => {
      this.handleDarkModeSwitchClick();
    });

    this._gameMusicSwitch.input.addEventListener("click", () => {
      this.handleGameMusicSwitchClick();
    });

    this._soundEffectsSwitch.input.addEventListener("click", () => {
      this.handleSoundEffectsSwitchClick();
    });

    this.updateTheme();
  }

  showDarkModeSwitch() {
    darkModeWrapper.appendChild(this._darkModeSwitch.container);
  }

  showGameMusicSwitch() {
    gameMusicWrapper.appendChild(this._gameMusicSwitch.container);
  }

  showSoundEffectsSwitch() {
    soundEffectsWrapper.appendChild(this._soundEffectsSwitch.container);
  }

  private handleDarkModeSwitchClick() {
    this._darkMode = !this._darkMode;

    this.updateTheme();
  }

  private updateTheme() {
    if (this._darkMode) {
      document.body.classList.add("dark");
    } else document.body.classList.remove("dark");
  }

  private handleGameMusicSwitchClick() {
    this._gameMusic = !this._gameMusic;
  }

  private handleSoundEffectsSwitchClick() {
    this._soundEffects = !this._soundEffects;
  }

  get darkMode(): boolean {
    return this._darkMode;
  }

  get gameMusic(): boolean {
    return this._gameMusic;
  }

  get soundEffects(): boolean {
    return this._soundEffects;
  }
}

const settings = new Settings();

export default settings;
