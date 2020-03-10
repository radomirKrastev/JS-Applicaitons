import { Processor } from "./commandProcessor.js";

let processor = new Processor();

let actions = {
  Update: (record) => processor.updateRecord(record),
  Delete: (record) => processor.deleteRecord(record),
  Load: () => processor.loadRecords(),
  Add: () => processor.postRecord()
};

function handle(e) {
  if (typeof actions[e.target.innerHTML] === "function") {
    actions[e.target.innerHTML](e.target);
  }
}

function attachEvents() {
  document.addEventListener("click", handle);
}

attachEvents();
