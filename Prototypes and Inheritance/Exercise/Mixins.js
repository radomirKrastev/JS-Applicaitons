function solve() {
  class Keyboard {
    constructor(manufacturer, responseTime) {
      this.manufacturer = manufacturer;
      this.responseTime = responseTime;
    }
  }

  class Monitor {
    constructor(manufacturer, width, height) {
      this.manufacturer = manufacturer;
      this.width = width;
      this.height = height;
    }
  }

  class Battery {
    constructor(manufacturer, expectedLife) {
      this.manufacturer = manufacturer;
      this.expectedLife = expectedLife;
    }
  }

  class Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
      if (new.target === Computer) {
        throw new Error("Cannot instantiate abstract class!");
      }
      this.manufacturer = manufacturer;
      this.processorSpeed = processorSpeed;
      this.ram = ram;
      this.hardDiskSpace = hardDiskSpace;
    }
  }

  class Laptop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.weight = weight;
      this.color = color;
      this.battery = battery;
    }

    get battery() {
      return this._battery;
    }

    set battery(value) {
      if (value.constructor.name !== "Battery") {
        throw new TypeError("Invalid value Type!");
      }

      this._battery = value;
    }
  }

  class Desktop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.keyboard = keyboard;
      this.monitor = monitor;
    }

    get keyboard() {
      return this._keyboard;
    }

    set keyboard(value) {
      if (value.constructor.name !== "Keyboard") {
        throw new TypeError("Invalid value Type!");
      }

      this._keyboard = value;
    }

    get monitor() {
      return this._monitor;
    }

    set monitor(value) {
      if (value.constructor.name !== "Monitor") {
        throw new TypeError("Invalid value Type!");
      }

      this._monitor = value;
    }
  }

  return {
    Battery,
    Keyboard,
    Monitor,
    Computer,
    Laptop,
    Desktop
  };
}

function mixins() {
  function computerQualityMixin(classToExtend) {
    function getQuality() {
      return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
    }

    function isFast() {
      return this.processorSpeed > this.ram / 4;
    }

    function isRoomy() {
      return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
    }

    classToExtend.prototype.getQuality = getQuality;
    classToExtend.prototype.isFast = isFast;
    classToExtend.prototype.isRoomy = isRoomy;
  }

  function styleMixin(classToExtend) {
    function isFullSet() {
      return (
        this.manufacturer === this.keyboard.manufacturer &&
        this.manufacturer === this.monitor.manufacturer
      );
    }

    function isClassy() {
      return (
        this.battery.expectedLife >= 3 &&
        (this.color === "Silver" || this.color === "Black") &&
        this.weight < 3
      );
    }

    classToExtend.prototype.isFullSet = isFullSet;
    classToExtend.prototype.isClassy = isClassy;
  }

  return { computerQualityMixin, styleMixin };
}
