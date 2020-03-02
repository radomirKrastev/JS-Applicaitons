function getInfo() {
  const busStop = document.querySelector("#stopId");
  const stopName = document.querySelector("#stopName");
  const buses = document.querySelector("#buses");

  buses.innerHTML = "";
  stopName.innerHTML = "";

  fetch(`https://judgetests.firebaseio.com/businfo/${busStop.value}.json`)
    .then((x) => x.json())
    .then(handleError)
    .then(processData);

  function processData(data) {
    let numbers = Object.keys(data.buses);
    stopName.innerHTML = data.name;

    for (let number of numbers) {
      let li = document.createElement("li");
      li.innerHTML = `Bus ${number} arrives in ${data.buses[number]} minutes`;
      buses.appendChild(li);
    }
  }

  function handleError(x) {
    if (x.error) {
      stopName.innerHTML = "Error";
    }

    return x;
  }
}
