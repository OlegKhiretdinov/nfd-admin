import * as type from "./types"

const initialState = {
  rateTypes: [],
  rateTypesPage: 0,
  rateTypesPageCount: 0,
  rateTypesFilter: "",
}

const rateTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_RATE_TYPE:
      return { ...state, rateTypes: action.rateTypes }
    case type.SET_RATE_TYPE_PAGE:
      return { ...state, rateTypesPage: action.rateTypesPage }
    case type.SET_RATE_TYPE_PAGE_COUNT:
      return { ...state, rateTypesPageCount: action.rateTypesPageCount }
    case type.SET_RATE_TYPE_FILTER:
      return { ...state, rateTypesFilter: action.rateTypesFilter }
    default:
      return state
  }
}

export default rateTypesReducer
