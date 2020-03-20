import { actions, formLoad } from "./commandProcessor.js";

function handle(e) {
  if (e.target.tagName === "BUTTON" && typeof actions[e.target.classList[0]] === "function") {
    e.preventDefault();
    actions[e.target.classList[0]](e.target);
  } else if (e.target.tagName === "TD") {
    formLoad(e.target);
  }
}

document.addEventListener("click", handle);
