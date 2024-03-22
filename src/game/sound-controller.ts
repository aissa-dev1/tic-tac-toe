import buildSoundUrl from "../utils/build-sound-url";

class SoundController {
  private _gameThemeSound = new Audio(buildSoundUrl("game_theme"));
  private _tapSound = new Audio(buildSoundUrl("tap"));
  private _chooseSound = new Audio(buildSoundUrl("choose"));
  private _winSound = new Audio(buildSoundUrl("win"));
  private _tieSound = new Audio(buildSoundUrl("tie"));

  private _gameThemeSoundPlayed = false;
  private _currentPlayedSound: HTMLAudioElement | null = null;

  constructor() {
    this._gameThemeSound.loop = true;
  }

  playGameThemeSound() {
    if (!this._gameThemeSoundPlayed) {
      this._gameThemeSound.play();

      this._gameThemeSoundPlayed = true;
    }
  }

  pauseGameThemeSound() {
    this._gameThemeSound.pause();

    this._gameThemeSoundPlayed = false;
  }

  play(audio: HTMLAudioElement) {
    if (this._currentPlayedSound !== null) {
      this._currentPlayedSound.pause();

      this._currentPlayedSound.currentTime = 0;
    }

    audio.play();

    this._currentPlayedSound = audio;
  }

  mute(audio: HTMLAudioElement) {
    audio.volume = 0;
  }

  unmute(audio: HTMLAudioElement) {
    audio.volume = 1;
  }

  get gameThemeSound(): HTMLAudioElement {
    return this._gameThemeSound;
  }

  get tapSound(): HTMLAudioElement {
    return this._tapSound;
  }

  get chooseSound(): HTMLAudioElement {
    return this._chooseSound;
  }

  get winSound(): HTMLAudioElement {
    return this._winSound;
  }

  get tieSound(): HTMLAudioElement {
    return this._tieSound;
  }
}

const soundController = new SoundController();

export default soundController;
