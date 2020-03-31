export class FetchData {
  get(path) {
    return fetch(path)
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  post(path, newBook) {
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBook)
    })
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  patch(path, editedBook) {
    return fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedBook)
    })
      .then(this._handleError)
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(path) {
    return fetch(path, {
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
}
