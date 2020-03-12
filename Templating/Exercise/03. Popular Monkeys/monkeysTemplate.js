import { monkeys } from "./monkeys.js";

$(async () => {
  let monkeyHdb = await fetch("/monkey.handlebars").then((x) => x.text());

  let monkeyTemplate = Handlebars.compile(monkeyHdb);
  let result = monkeyTemplate({ monkeys });

  document.body.insertAdjacentHTML("beforeend", result);

  function attachEvents() {
    document.addEventListener("click", function(e) {
      if (e.target.tagName === "BUTTON") {
        let element = document.getElementById(`${e.target.dataset.id}`);

        element.style.display = element.style.display === "none" ? "block" : "none";
      }
    });
  }

  attachEvents();
});
