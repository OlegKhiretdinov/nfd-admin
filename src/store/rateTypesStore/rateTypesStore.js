import * as type from "./types"

const initialState = {
  rateTypes: [],
}

const rateTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_RATE_TYPE:
      return { ...state, rateTypes: action.rateTypes }
    default:
      return state
  }
}

export default rateTypesReducer
