import { loginRequest } from "../api/request"
import { setLocalStorageAuthToken } from "../utils/localStorage"

const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN"
const SET_LOGIN_ERRORS = "SET_LOGIN_ERRORS"

const initialState = {
  token: "",
  errors: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return { ...state, token: action.token }
    case SET_LOGIN_ERRORS:
      return { ...state, errors: action.errors }
    default:
      return state
  }
}

const setLoginErrors = (errors) => ({
  type: SET_LOGIN_ERRORS,
  errors,
})

export const setAuthToken = (token) => ({
  type: SET_LOGIN_TOKEN,
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
