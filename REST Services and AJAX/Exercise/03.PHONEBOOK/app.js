function attachEvents() {
  const createButton = document.querySelector("#btnCreate");
  const loadButton = document.querySelector("#btnLoad");
  const phonebook = document.querySelector("#phonebook");
  const person = document.querySelector("#person");
  const phone = document.querySelector("#phone");

  function updatePhonebook(data) {
    let keys = Object.keys(data);
    phonebook.innerHTML = "";

    for (let key of keys) {
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", deleteContact);

      let li = document.createElement("li");
      li.innerHTML = `${data[key].person}: ${data[key].phone}`;
      li.id = key;
      li.appendChild(deleteButton);
      phonebook.appendChild(li);
    }
  }

  function loadEntries() {
    fetch("https://phonebook-nakov.firebaseio.com/phonebook.json")
      .then((x) => x.json())
      .then(updatePhonebook);
  }

  function deleteContact(e) {
    let contact = e.target.parentElement.id;
    phonebook.removeChild(phonebook.querySelector(`#${contact}`));

    fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${contact}.json`, {
      method: "DELETE"
    });
  }

  function createContact() {
    fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, {
      method: "POST",
      body: JSON.stringify({ person: person.value, phone: phone.value })
    });

    loadEntries();
    person.value = "";
    phone.value = "";
  }

  loadButton.addEventListener("click", loadEntries);
  createButton.addEventListener("click", createContact);
}

attachEvents();
