import { loginRequest } from "../api/request"
import { setLocalStorageAuthToken } from "../utils/localStorage"
import * as types from "./types"

const initialState = {
  token: "",
  errors: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGIN_TOKEN:
      return { ...state, token: action.token }
    case types.SET_LOGIN_ERRORS:
      return { ...state, errors: action.errors }
    default:
      return state
  }
}

const setLoginErrors = (errors) => ({
  type: types.SET_LOGIN_ERRORS,
  errors,
})

export const setAuthToken = (token) => ({
  type: types.SET_LOGIN_TOKEN,
  token,
})

export const login = (userName, password) => async (dispatch) => {
  const response = await loginRequest(userName, password)

  if (response.errors) {
    dispatch(setLoginErrors(response.errors))
  } else {
    dispatch(setLoginErrors([]))
    setLocalStorageAuthToken(response.access_token)
    dispatch(setAuthToken(response.access_token))
  }
}

export default authReducer
