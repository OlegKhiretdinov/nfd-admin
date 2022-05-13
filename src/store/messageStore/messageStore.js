import * as type from "./type"

const initialState = {
  message: "",
  messageType: "",
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_MESSAGE:
      return { ...state, message: action.message }
    case type.SET_MESSAGE_TYPE:
      return { ...state, messageType: action.messageType }
    default:
      return state
  }
}

export default messageReducer
