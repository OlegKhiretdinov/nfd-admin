import * as type from "./types"

const initialState = {
  carListPage: 0,
  carsPageCount: 0,
  carsList: [],
}

const carsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CARS_LIST_PAGE:
      return { ...state, carListPage: action.carListPage }
    case type.SET_CARS_LIST:
      return { ...state, carsList: action.carsList }
    case type.SET_CARS_PAGE_COUNT:
      return { ...state, carsPageCount: action.carsPageCount }
    default:
      return state
  }
}

export default carsListReducer
