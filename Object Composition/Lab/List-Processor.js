function solve(input) {
  const processor = {
    arr: [],
    add: function(str) {
      this.arr.push(str);
    },
    remove: function(str) {
      this.arr = this.arr.filter((x) => x !== str);
    },
    print: function(_) {
      console.log(this.arr.join(","));
    }
  };

  input.forEach(function(x) {
    let tokens = x.split(" ");
    processor[tokens[0]](tokens[tokens.length - 1]);
  });
}

solve(["add hello", "add again", "remove hello", "add again", "print"]);
solve(["add pesho", "add george", "add peter", "remove peter", "print"]);
