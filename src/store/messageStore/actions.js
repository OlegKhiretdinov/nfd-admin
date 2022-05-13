import * as type from "./type"

export const setMessage = (message) => ({
  type: type.SET_MESSAGE,
  message,
})

export const setMessageType = (messageType) => ({
  type: type.SET_MESSAGE_TYPE,
  messageType,
})
