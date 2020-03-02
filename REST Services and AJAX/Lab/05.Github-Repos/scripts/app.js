function loadRepos() {
  const name = document.querySelector("#username");
  const repos = document.querySelector("#repos");

  repos.innerHTML = "";

  fetch(`https://api.github.com/users/${name.value}/repos`)
    .then((x) => x.json())
    .then(handleErrors)
    .then(processData)
    .then(addRepo);

  function processData(data) {
    return data.map((x) => [x.html_url, x.full_name]);
  }

  function addRepo(allRepos) {
    for (let repo of allRepos) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = repo[0];
      a.innerHTML = repo[1];
      li.appendChild(a);
      repos.appendChild(li);
    }
  }

  function handleErrors(x) {
    if (x.documentation_url) {
      let li = document.createElement("li");
      li.innerHTML = x.message;
      repos.appendChild(li);
    }

    return x;
  }
}
