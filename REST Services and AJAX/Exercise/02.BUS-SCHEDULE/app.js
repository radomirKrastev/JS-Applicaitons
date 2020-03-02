const departButton = document.querySelector("#depart");
const arriveButton = document.querySelector("#arrive");
const stopInfo = document.querySelector("#info");
let currentStopId = "depot";

function solve() {
  function processData(stop, action) {
    if (action.includes("Arriving")) {
      currentStopId = stop.next;
    }

    stopInfo.innerHTML = `${action} ${stop.name}`;
  }

  function handleErrors(x) {
    if (x.error) {
      stopInfo.innerHTML = "Error";
      arriveButton.disabled = true;
      departButton.disabled = true;
    } else {
      return x;
    }
  }

  function depart() {
    fetch(`https://judgetests.firebaseio.com/schedule/${currentStopId}.json`)
      .then((x) => x.json())
      .then(handleErrors)
      .then((x) => processData(x, "Next stop"));

    departButton.disabled = true;
    arriveButton.disabled = false;
  }

  function arrive() {
    fetch(`https://judgetests.firebaseio.com/schedule/${currentStopId}.json`)
      .then((x) => x.json())
      .then(handleErrors)
      .then((x) => processData(x, "Arriving at"));

    arriveButton.disabled = true;
    departButton.disabled = false;
  }

  return {
    depart,
    arrive
  };
}

let result = solve();
