import * as type from "./types"

const initialState = {
  carsOffset: 0,
  carsPageCount: 0,
  carsList: [],
}

const carsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CARS_OFFSET:
      return { ...state, carsOffset: action.carsOffset }
    case type.SET_CARS_LIST:
      return { ...state, carsList: action.carsList }
    case type.SET_CARS_PAGE_COUNT:
      return { ...state, carsPageCount: action.carsPageCount }
    default:
      return state
  }
}

export default carsListReducer
