export function buildRecord(key, recordsData) {
  let div = createElement("div", undefined, ["catch"]);
  div.id = key;
  appendDivElements(div, "Angler", "text", ["angler"], recordsData[key].angler);
  appendDivElements(div, "Weight", "number", ["weight"], recordsData[key].weight);
  appendDivElements(div, "Species", "text", ["species"], recordsData[key].species);
  appendDivElements(div, "Location", "text", ["location"], recordsData[key].location);
  appendDivElements(div, "Bait", "text", ["bait"], recordsData[key].bait);
  appendDivElements(div, "Capture Time", "number", ["captureTime"], recordsData[key].captureTime);

  let updateBttn = createElement("button", undefined, ["update"]);
  updateBttn.innerHTML = "Update";
  let deleteBttn = createElement("button", undefined, ["delete"]);
  deleteBttn.innerHTML = "Delete";
  div.appendChild(updateBttn);
  div.appendChild(deleteBttn);

  return div;
}

function createElement(tag, type, classes, value) {
  let element = document.createElement(tag);
  if (type) {
    element.type = type;
  }
  if (classes) {
    classes.forEach((x) => element.classList.add(x));
  }
  if (value) {
    element.value = value;
  }

  return element;
}

function appendDivElements(div, labelText, type, classes, value) {
  let label = createElement("label");
  label.innerHTML = labelText;
  div.appendChild(label);
  div.appendChild(createElement("input", type, classes, value));
  div.appendChild(createElement("hr"));
}
