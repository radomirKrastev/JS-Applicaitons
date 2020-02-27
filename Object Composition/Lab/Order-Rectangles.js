function solve(data) {
  function area() {
    return this.width * this.height;
  }

  function compareTo(other) {
    return this.area() - other.area() === 0 ? this.width - other.width : this.area() - other.area();
  }

  const rectangle = {
    width: 0,
    height: 0,
    area,
    compareTo
  };

  return data
    .map(([width, height]) => {
      //return Object.assign(Object.create(rectangle), { width, height });
      return { ...rectangle, width, height };
    })
    .sort((a, b) => b.compareTo(a));
}

// console.log(
//   solve([
//     [10, 5],
//     [5, 12]
//   ])
// );

// console.log(
//   solve([
//     [10, 5],
//     [3, 20],
//     [5, 12]
//   ])
// );
