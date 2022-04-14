export const setLocalStorageData = (fieldName, token) =>
  localStorage.setItem(fieldName, token)

export const getLocalStorageData = (fieldName) =>
  localStorage.getItem(fieldName)

export const removeLocalStorageData = (fieldName) =>
  localStorage.removeItem(fieldName)
