const baseUrl = "https://api-factory.simbirsoft1.com/api/"

const headers = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  "Content-Type": "application/json",
  Authorization: `Basic ${btoa("random:4cbcea96de")}`,
}

export const loginRequest = (username, password) => {
  return fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json())
}
