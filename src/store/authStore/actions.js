import { loginRequest } from "../../api/request"
import { setLocalStorageData } from "../../utils/localStorage"
import * as types from "./types"

const setLoginErrors = (errors) => ({
  type: types.SET_LOGIN_ERRORS,
  errors,
})

export const setAuthToken = (token) => ({
  type: types.SET_LOGIN_TOKEN,
  token,
})

export const login = (userName, password) => async (dispatch) => {
  try {
    const response = await loginRequest(userName, password)
    setLocalStorageData("token", response.access_token)
    setLocalStorageData("expires_date", response.expires_in * 1000 + Date.now())
    dispatch(setAuthToken(response.access_token))
    dispatch(setLoginErrors(""))
  } catch {
    dispatch(setLoginErrors("Неверный логин или пароль"))
  }
}
