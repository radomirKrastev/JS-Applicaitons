function solve() {
  fetch("https://swapi.co/api/people/4")
    .then((x) => x.json())
    .then((x) => console.log(JSON.stringify(x)));
}

solve();
