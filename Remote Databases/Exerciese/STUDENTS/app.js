import { actions } from "./commandProcessor.js";
import { html } from "./html.js";

function submitForm(e) {
  e.preventDefault();
  actions.create();
}

function handle(e) {
  if (e.target.tagName === "BUTTON") {
    actions[e.target.classList[0]]();
  }
}

html.loadButton().addEventListener("click", handle);
html.createForm().addEventListener("submit", submitForm);
