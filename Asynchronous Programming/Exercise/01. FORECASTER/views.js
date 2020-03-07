function createElement(tag, classV, text) {
  let element = document.createElement(tag);
  if (classV) {
    classV.forEach((x) => element.classList.add(x));
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

const weatherSymbols = {
  Sunny: "☀",
  "Partly sunny": "⛅",
  Overcast: "☁",
  Rain: "☂",
  Degrees: "°"
};

function cleanHtml(element) {
  while (element.children.length > 1) {
    element.removeChild(element.lastElementChild);
  }
}

function appendSpans(parent, classes, degrees, condition) {
  parent.appendChild(createElement("span", classes, degrees));
  parent.appendChild(createElement("span", classes, condition));
}

export function displayToday(data, html) {
  const forecasts = createElement("div", ["forecasts"]);
  cleanHtml(html.current());

  const condition = data.forecast.condition;
  forecasts.appendChild(createElement("span", ["condition", "symbol"], weatherSymbols[condition]));

  const span = createElement("span", ["condition"]);
  span.appendChild(createElement("span", ["forecast-data"], data.name));
  const low = `${data.forecast.low}${weatherSymbols.Degrees}`;
  const high = `${data.forecast.high}${weatherSymbols.Degrees}`;
  appendSpans(span, ["forecast-data"], `${low}/${high}`, condition);

  forecasts.appendChild(span);

  html.current().appendChild(forecasts);
  html.forecast().style.display = "block";
}

export function displayUpcoming(data, html) {
  cleanHtml(html.upcoming());
  const forecastInfo = createElement("div", ["forecast-info"]);

  data.forecast.forEach(function(x) {
    const span = createElement("span", ["upcoming"]);
    span.appendChild(createElement("span", ["symbol"], weatherSymbols[x.condition]));

    const low = `${x.low}${weatherSymbols.Degrees}`;
    const high = `${x.high}${weatherSymbols.Degrees}`;
    appendSpans(span, ["forecast-data"], `${low}/${high}`, x.condition);

    forecastInfo.appendChild(span);
  });

  html.upcoming().appendChild(forecastInfo);
}
