import { loginRequest } from "../../api/request"
import { setLocalStorageAuthToken } from "../../utils/localStorage"
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
    setLocalStorageAuthToken(response.access_token)
    dispatch(setAuthToken(response.access_token))
    dispatch(setLoginErrors(""))
  } catch {
    dispatch(setLoginErrors("Неверный логин или пароль"))
  }
}