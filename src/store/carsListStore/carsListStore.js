import * as type from "./types"

const initialState = {
  carListPage: 0,
  carsPageCount: 0,
  carsList: [],
  carListFilter: "",
}

const carsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CARS_LIST_PAGE:
      return { ...state, carListPage: action.carListPage }
    case type.SET_CARS_LIST:
      return { ...state, carsList: action.carsList }
    case type.SET_CARS_PAGE_COUNT:
      return { ...state, carsPageCount: action.carsPageCount }
    case type.SET_CAR_LIST_FILTER:
      return { ...state, carListFilter: action.carListFilter }
    default:
      return state
  }
}

export default carsListReducer
