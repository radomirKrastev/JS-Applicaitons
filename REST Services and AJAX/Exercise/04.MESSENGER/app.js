function attachEvents() {
  const author = document.querySelector("#author");
  const content = document.querySelector("#content");
  const submitButton = document.querySelector("#submit");
  const refreshButton = document.querySelector("#refresh");
  const messages = document.querySelector("#messages");

  function processData(data) {
    let keys = Object.keys(data);
    messages.innerHTML = "";
    messages.innerHTML = keys.map((x) => `${data[x].author}: ${data[x].content}`).join("\n");
  }

  function showMessages() {
    fetch("https://rest-messanger.firebaseio.com/messanger.json")
      .then((x) => x.json())
      .then(processData);
  }

  function addMessage() {
    fetch("https://rest-messanger.firebaseio.com/messanger.json", {
      method: "POST",
      body: JSON.stringify({ author: author.value, content: content.value })
    });
  }

  refreshButton.addEventListener("click", showMessages);
  submitButton.addEventListener("click", addMessage);
}

attachEvents();
