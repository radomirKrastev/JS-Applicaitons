function solve() {
  let clicked = [];

  function changeColor(e) {
    let currentElement = e.target.parentNode;

    if (clicked.length !== 0) {
      let styledElement = clicked.shift();
      styledElement.style.backgroundColor = "";

      if (styledElement === currentElement) {
        return;
      }
    }

    currentElement.style.backgroundColor = "#413f5e";
    clicked.push(currentElement);
  }

  Array.from(document.querySelectorAll("tbody tr")).forEach((x) =>
    x.addEventListener("click", changeColor)
  );
}
