function handleError(e) {
  if (!e.ok) {
    throw new Error("needs further implementation!!!");
  }
  return e;
}

function deserialize(x) {
  return x.json();
}

export function fetchData(hError = handleError, dData = deserialize, url) {
  return fetch(url)
    .then(hError)
    .then(dData);
}
