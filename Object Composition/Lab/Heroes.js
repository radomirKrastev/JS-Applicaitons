function solve() {
  function fight() {
    this.stamina--;
    console.log(`${this.name} slashes at the foe!`);
  }

  function cast(spell) {
    this.mana--;
    console.log(`${this.name} cast ${spell}`);
  }

  const state = {
    name: "",
    health: 100
  };

  const fighter = (name) => {
    return Object.assign(state, { name, stamina: 100, fight });
  };

  const mage = (name) => {
    return Object.assign(state, { name, mana: 100, cast });
  };

  return { mage, fighter };
}

let create = solve();
const scorcher = create.mage("Scorcher");
console.log(scorcher);
scorcher.cast("fireball");
scorcher.cast("thunder");
scorcher.cast("light");

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight();

console.log(scorcher2.stamina);
console.log(scorcher.mana);
