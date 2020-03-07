import { displayToday, displayUpcoming } from "./views.js";
import { Handler } from "./handler.js";

function attachEvents() {
  const handler = new Handler("https://judgetests.firebaseio.com/");

  const html = {
    location: () => document.querySelector("#location"),
    current: () => document.querySelector("#current"),
    upcoming: () => document.querySelector("#upcoming"),
    forecast: () => document.querySelector("#forecast")
  };

  const actions = {
    submit: async function() {
      const towns = await handler.getTowns();
      const currentTown = towns.find((x) => x.name === html.location().value);
      const today = await handler.getTodayWeather(currentTown.code);
      const upcoming = await handler.getUpcomingWeather(currentTown.code);

      displayToday(today, html);
      displayUpcoming(upcoming, html);
    }
  };

  function handle(e) {
    if (typeof actions[e.target.id] === "function") {
      actions[e.target.id]();
    }
  }

  document.addEventListener("click", handle);
}

attachEvents();
