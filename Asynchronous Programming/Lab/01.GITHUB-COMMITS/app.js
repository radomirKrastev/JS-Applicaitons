function loadCommits() {
  const html = {
    username: () => document.querySelector("#username"),
    repo: () => document.querySelector("#repo"),
    commits: () => document.querySelector("#commits")
  };

  function displayError(message) {
    html.commits().innerHTML = "";
    const li = document.createElement("li");
    li.innerHTML = message;
    html.commits().appendChild(li);
  }

  function displayCommits(data) {
    const fragment = document.createDocumentFragment();
    html.commits().innerHTML = "";

    data.forEach(function(x) {
      console.log(x);
      const li = document.createElement("li");
      li.innerHTML = `${x.commit.author.name}: ${x.commit.message}`;
      fragment.appendChild(li);
    });

    html.commits().appendChild(fragment);
  }

  async function getData() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${html.username().value}/${html.repo().value}/commits`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      const result = await response.json();
      displayCommits(result);
    } catch (e) {
      displayError(e.message);
    }
  }

  getData();
}
