import * as type from "./type"
const initialState = {
  carTypes: [],
}

const carTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CAR_TYPE:
      return { ...state, carTypes: action.carTypes }
    default:
      return state
  }
}

export default carTypesReducer
