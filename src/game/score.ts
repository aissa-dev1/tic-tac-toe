class Score {
  private _value = 0;

  increase(by = 1) {
    this._value += by;
  }

  decrease(by = 1) {
    if (this._value <= 0) return;

    this._value -= by;
  }

  reset() {
    this._value = 0;
  }

  get value(): number {
    return this._value;
  }
}

export default Score;
