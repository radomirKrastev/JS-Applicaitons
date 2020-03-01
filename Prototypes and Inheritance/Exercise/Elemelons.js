function solve() {
  class Melon {
    constructor(weight, melonSort) {
      if (new.target === Melon) {
        throw new TypeError("Abstract class cannot be instantiated directly");
      }

      this.weight = weight;
      this.melonSort = melonSort;
      this.element = this.constructor.name.replace("melon", "");
    }

    get elementIndex() {
      return this.weight * this.melonSort.length;
    }

    toString() {
      return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
    }
  }

  class Watermelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Firemelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Earthmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Airmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort);

      this.element = "Water";
      this.elements = ["Fire", "Earth", "Air", "Water"];
    }

    morph() {
      let current = this.elements.shift();
      this.element = current;
      this.elements.push(current);
    }
  }

  return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}
