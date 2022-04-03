export const setLocalStorageAuthToken = (token) =>
  localStorage.setItem("token", token)

export const getLocalStorageAuthToken = () => localStorage.getItem("token")

export const removeLocalStorageAuthToken = () =>
  localStorage.removeItem("token")
