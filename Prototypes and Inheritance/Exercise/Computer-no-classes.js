function solve() {
  function Keyboard(manufacturer, responseTime) {
    this.manufacturer = manufacturer;
    this.responseTime = responseTime;
  }

  function Monitor(manufacturer, width, height) {
    this.manufacturer = manufacturer;
    this.width = width;
    this.height = height;
  }

  function Battery(manufacturer, expectedLife) {
    this.manufacturer = manufacturer;
    this.expectedLife = expectedLife;
  }

  function Computer(manufacturer, processorSpeed, ram, hardDiskSpace) {
    if (new.target === Computer) {
      throw new Error("Cannot instantiate abstract class!");
    }
    this.manufacturer = manufacturer;
    this.processorSpeed = processorSpeed;
    this.ram = ram;
    this.hardDiskSpace = hardDiskSpace;
  }

  function Laptop(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
    Computer.call(this, manufacturer, processorSpeed, ram, hardDiskSpace);
    this.weight = weight;
    this.color = color;

    Object.defineProperty(this, "battery", {
      get: function() {
        return this._battery;
      },
      set: function(value) {
        if (value.constructor.name !== "Battery") {
          throw new TypeError("Invalid value Type!");
        }

        this._battery = value;
      }
    });

    this.battery = battery;
  }

  Object.setPrototypeOf(Laptop, Computer);
  Laptop.prototype.constructor = Laptop;

  function Desktop(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
    Computer.call(this, manufacturer, processorSpeed, ram, hardDiskSpace);

    Object.defineProperty(this, "keyboard", {
      get: function() {
        return this._keyboard;
      },
      set: function(value) {
        if (value.constructor.name !== "Keyboard") {
          throw new TypeError("Invalid value Type");
        }

        this._keyboard = value;
      }
    });

    Object.defineProperty(this, "monitor", {
      get: function() {
        return this._monitor;
      },
      set: function(value) {
        if (value.constructor.name !== "Monitor") {
          throw new TypeError("Invalid value Type");
        }

        this._monitor = value;
      }
    });

    this.keyboard = keyboard;
    this.monitor = monitor;
  }

  Object.setPrototypeOf(Desktop, Computer);
  Desktop.prototype.constructor = Desktop;

  return { Keyboard, Monitor, Battery, Computer, Laptop, Desktop };
}

let classes = solve();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let keyboard = new Keyboard("Logitech", 70);
let monitor = new Monitor("Benq", 28, 18);
let desktop = new Desktop("JAR Computers", 3.3, 8, 1, keyboard, monitor);
console.log();
