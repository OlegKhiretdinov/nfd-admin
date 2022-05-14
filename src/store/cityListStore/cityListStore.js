import * as type from "./type"

const initialState = {
  cityList: [],
}

const cityListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CITY_LIST:
      return { ...state, cityList: action.cityList }
    default:
      return state
  }
}

export default cityListReducer
