import { tableRowLimit } from "../utils/const"
import { getLocalStorageData } from "../utils/localStorage"

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

export const requestTableData = (table, page, filter) => {
  const token = getLocalStorageData("token")
  let requestUrl = `${baseUrl}db/${table}/`
  if (page !== undefined) {
    requestUrl += `?limit=${tableRowLimit}&page=${page}`
  }

  if (filter !== undefined) {
    requestUrl += `${filter}`
  }

  return fetch(`${requestUrl}`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
}

export const requestGetEntity = (table, id) => {
  const token = getLocalStorageData("token")
  return fetch(`${baseUrl}db/${table}/${id ? id : ""}`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
}

export const requestEditEntity = (table, method, data, id) => {
  const token = getLocalStorageData("token")
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
  const token = getLocalStorageData("token")
  return fetch(`${baseUrl}db/${table}/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
}
