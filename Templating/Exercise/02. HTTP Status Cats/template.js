(() => {
  renderCatTemplate();
  attachEvents();

  async function renderCatTemplate() {
    const cats = window.cats;
    let catsHdb = await fetch(`templates/all-cats.handlebars`).then((x) => x.text());
    let catHdb = await fetch(`templates/cat.handlebars`).then((x) => x.text());

    Handlebars.registerPartial("cat", catHdb);
    let catsTemplate = Handlebars.compile(catsHdb);
    let result = catsTemplate({ cats });

    const allCats = () => document.querySelector("#allCats");
    allCats().innerHTML = result;
  }

  function attachEvents() {
    document.addEventListener("click", function(e) {
      if (e.target.tagName === "BUTTON") {
        let button = document.getElementById(`${e.target.id}`);
        let element = document.getElementById(`cat_${e.target.id}`);

        button.textContent =
          button.textContent === "Show status code" ? "Hide status code" : "Show status code";

        element.style.display = element.style.display === "none" ? "block" : "none";
      }
    });
  }
})();
