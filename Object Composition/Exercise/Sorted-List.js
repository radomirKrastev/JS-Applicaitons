function solve() {
  function binaryFind(searchElement) {
    let minIndex = 0;
    let maxIndex = this.length - 1;
    let currentIndex;
    let currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = ((minIndex + maxIndex) / 2) | 0;
      currentElement = this[currentIndex];

      if (currentElement < searchElement) {
        minIndex = currentIndex + 1;
      } else if (currentElement > searchElement) {
        maxIndex = currentIndex - 1;
      } else {
        return {
          found: true,
          index: currentIndex
        };
      }
    }

    return {
      found: false,
      index: currentElement < searchElement ? currentIndex + 1 : currentIndex
    };
  }

  return {
    list: [],
    add: function(element) {
      let res = binaryFind.call(this.list, element);
      this.list.splice(res.index, 0, element);
    },
    remove: function(index) {
      if (index < this.list.length && index >= 0) {
        this.list.splice(index, 1);
      }
    },
    get: function(index) {
      if (index < this.list.length && index >= 0) {
        return this.list[index];
      }
    },
    get size() {
      return this.list.length;
    }
  };
}

let result = solve();
// result.add(3);
// result.add(1);
// result.add(2);
// result.add(2);
result.add(5);
result.add(3);
result.remove(0);
let a = result.size;
console.log();
