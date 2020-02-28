function solve() {
  class Figure {
    constructor() {
      this.unitAdjust = this.units.cm;
    }

    get units() {
      return { m: 0.01, cm: 1, mm: 10 };
    }

    changeUnits(unit) {
      this.unitAdjust = this.units[unit];
      this.unit = unit;
    }

    get area() {
      return Nan;
    }

    toString() {
      return "";
    }
  }

  class Circle extends Figure {
    constructor(radius, unit) {
      super();
      this.unit = unit || "cm";
      this.unitAdjust = this.units[this.unit];
      this.r = radius;
    }

    get r() {
      return this._r * this.unitAdjust;
    }

    set r(value) {
      this._r = value;
    }

    get area() {
      return Math.PI * this.r * this.r * this.unitAdjust;
    }
    toString() {
      return `Figures units: ${this.unit} Area: ${this.area} - radius: ${this.r * this.unitAdjust}`;
    }
  }

  class Rectangle extends Figure {
    constructor(width, height, unit) {
      super();
      this.unit = unit || "cm";
      this.unitAdjust = this.units[this.unit];
      this.width = width;
      this.height = height;
    }

    get width() {
      return this._width * this.unitAdjust;
    }

    set width(value) {
      this._width = value;
    }

    get height() {
      return this._height * this.unitAdjust;
    }

    set height(value) {
      this._height = value;
    }

    get area() {
      return this.width * this.height;
    }

    toString() {
      return `Figures units: ${this.unit} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
    }
  }

  return { Figure, Rectangle, Circle };
}

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, "mm");
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits("cm");
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits("mm");
console.log(c.area); // 7853.981633974483
console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50
