import * as types from "./types"

const initialState = {
  token: "",
  errors: "",
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

export default authReducer
