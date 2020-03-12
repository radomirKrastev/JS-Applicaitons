let handleBars = window.Handlebars;

function main() {
  const loadButton = () => document.querySelector("#btnLoadTowns");
  const getTowns = () => document.querySelector("#towns");
  const getRoot = () => document.querySelector("#root");

  async function handle() {
    let towns = getTowns().value.split(", ");
    let townsHdb = await fetch("towns.handlebars").then((x) => x.text());

    let townsTemplate = handleBars.compile(townsHdb);
    const result = townsTemplate({ towns });
    getRoot().innerHTML = result;
  }

  loadButton().addEventListener("click", handle);
}

main();
