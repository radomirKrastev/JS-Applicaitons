function result() {
  class Balloon {
    constructor(color, gasWeight) {
      this.color = color;
      this.gasWeight = gasWeight;
    }
  }

  class PartyBalloon extends Balloon {
    constructor(color, gasWeight, ribbonColor, ribbonLength) {
      super(color, gasWeight);
      this._ribbonColor = ribbonColor;
      this._ribbonLength = ribbonLength;
    }

    get ribbon() {
      return { color: this._ribbonColor, length: this._ribbonLength };
    }
  }

  class BirthdayBalloon extends PartyBalloon {
    constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
      super(color, gasWeight, ribbonColor, ribbonLength, text);
      this._text = text;
    }

    get text() {
      return this._text;
    }
  }

  return { Balloon, PartyBalloon, BirthdayBalloon };
}
