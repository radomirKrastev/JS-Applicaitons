import { buildRecord } from "./elementBuilder.js";
import { FetchData } from "./myFetch.js";
import { htmlData } from "./htmlData.js";

export class Processor {
  constructor() {
    this.myFetch = new FetchData("https://fisher-game.firebaseio.com/catches/");
    this.html = htmlData;
  }

  async loadRecords() {
    let result = await this.myFetch.get();
    let fragment = document.createDocumentFragment();

    this.html.catches().innerHTML = "";
    Object.keys(result).forEach((key) => fragment.appendChild(buildRecord(key, result)));
    this.html.catches().appendChild(fragment);
  }

  async postRecord() {
    const record = {
      angler: this.html.angler().value,
      weight: this.html.weigth().value,
      species: this.html.species().value,
      location: this.html.location().value,
      bait: this.html.bait().value,
      captureTime: this.html.captureTime().value
    };

    await this.myFetch.post(record);
  }

  async updateRecord(record) {
    let parent = record.parentElement;
    let update = Array.from(parent.querySelectorAll("input")).reduce(function(res, inp) {
      res[inp.classList[0]] = inp.value;
      return res;
    }, {});

    await this.myFetch.put(parent.id, update);
  }

  async deleteRecord(record) {
    let parent = record.parentElement;
    await this.myFetch.delete(parent.id);
  }
}
