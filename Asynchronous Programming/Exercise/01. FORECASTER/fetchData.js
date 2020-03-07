export function fetchData(url) {
  return fetch(url)
    .then(handleError)
    .then((x) => x.json());
}

function handleError(response) {
  if (!response.ok) {
    throw new Error("Error");
  }

  return response;
}
