function solve() {
  const obj = {
    init: function(x, y, z) {
      this.selector1 = document.querySelector(`${x}`);
      this.selector2 = document.querySelector(`${y}`);
      this.resultBox = document.querySelector(`${z}`);
    },
    add: function() {
      this.resultBox.value = Number(this.selector1.value) + Number(this.selector2.value);
    },
    subtract: function() {
      this.resultBox.value = Number(this.selector1.value) - Number(this.selector2.value);
    }
  };

  //obj.init("#num1", "#num2", "#result");
  //document.querySelector("#sumButton").addEventListener("click", obj.add.bind(obj));
  //document.querySelector("#subtractButton").addEventListener("click", obj.subtract.bind(obj));

  return obj;
}

solve();
