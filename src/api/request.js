import { tableRowLimit } from "../utils/const"

const baseUrl = "https://api-factory.simbirsoft1.com/api/"

const headers = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  "Content-Type": "application/json",
}

export const loginRequest = (username, password) => {
  return fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Basic ${btoa("random:4cbcea96de")}`,
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json())
}

export const requestTableData = (token, table, offset) => {
  return fetch(
    `${baseUrl}db/${table}/?limit=${tableRowLimit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => response.json())
}

export const requestGetEntity = (token, table, id) => {
  return fetch(`${baseUrl}db/${table}/${id ? id : ""}`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
}

export const requestEditEntity = (token, table, method, data, id) => {
  return fetch(`${baseUrl}db/${table}/${id ? id : ""}`, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

export const requestAddEntity = (token, table, method, data, id) => {
  return fetch(`${baseUrl}db/${table}/${id ? id : ""}`, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

export const requestDeleteEntity = (table, id) => {
  return fetch(`${baseUrl}db/${table}/${id}`, {
    method: "DELETE",
    headers,
  })
}
