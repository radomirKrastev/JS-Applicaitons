function solve(input) {
  const objects = {};

  function create(name, _, baseName) {
    let parent = objects[baseName] || null;
    objects[name] = Object.create(parent);
  }

  function set(name, key, value) {
    objects[name][key] = value;
  }

  function print(name) {
    const obj = objects[name];
    const output = [];
    for (const key in obj) {
      output.push(`${key}:${obj[key]}`);
    }

    console.log(output.join(", "));
  }

  const map = { create, set, print };

  input.forEach(function(x) {
    const [command, ...params] = x.split(" ");
    map[command](...params);
  });
}

solve([
  "create c1",
  "create c2 inherit c1",
  "set c1 color red",
  "set c2 model new",
  "print c1",
  "print c2"
]);
