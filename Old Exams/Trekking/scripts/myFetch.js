class FetchData {
  constructor(url) {
    this.url = url;
  }

  get(extension) {
    return fetch(`${this.url}${extension}`)
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  post(extension, item) {
    console.log(`${this.url}${extension}`);
    return fetch(`${this.url}${extension}`, {
      method: "POST",
      headers: this._createHeader(),
      body: JSON.stringify(item)
    })
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  patch(extension, item) {
    return fetch(`${this.url}${extension}`, {
      method: "PATCH",
      headers: this._createHeader(),
      body: JSON.stringify(item)
    })
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(extension) {
    return fetch(`${this.url}${extension}`, {
      method: "DELETE"
    })
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  _handleError(response) {
    if (!response.ok) {
      throw new Error(response.message);
    }

    return response;
  }

  _createHeader() {
    return { "Content-Type": "application/json" };
  }
}

export let myFetch = new FetchData("https://trekking-72b5c.firebaseio.com/");
