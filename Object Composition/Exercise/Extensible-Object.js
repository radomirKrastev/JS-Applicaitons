function solve() {
  function extend(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "function") {
        Object.getPrototypeOf(this)[key] = obj[key];
      } else {
        this[key] = obj[key];
      }
    }
  }

  return { extend };
}

let obj = solve();

obj.extend({
  extensionMethod: function() {
    return 2;
  },
  extensionProperty: "someString"
});

console.log(obj);
