export class FetchData {
  constructor(url) {
    this.url = url;
  }

  post(record) {
    fetch(`${this.url}.json`, {
      method: "POST",
      body: JSON.stringify(record)
    }).then(this._handleError);
  }

  get() {
    return fetch(`${this.url}.json`)
      .then(this._handleError)
      .then((x) => x.json());
  }

  put(id, update) {
    fetch(`${this.url}${id}.json`, {
      method: "PUT",
      body: JSON.stringify(update)
    })
      .then(this._handleError)
      .then((x) => x.json());
  }

  delete(id) {
    fetch(`${this.url}${id}.json`, {
      method: "DELETE"
    });
  }

  _handleError(response) {
    if (!response.ok) {
      throw new Error(response.message);
    }

    return response;
  }
}
