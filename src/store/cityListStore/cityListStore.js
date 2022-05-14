import * as type from "./type"

const initialState = {
  cityList: [],
  cityListPage: 0,
  cityListPageCount: 0,
  cityListFilter: "",
}

const cityListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CITY_LIST:
      return { ...state, cityList: action.cityList }
    case type.SET_CITY_LIST_PAGE:
      return { ...state, cityListPage: action.cityListPage }
    case type.SET_CITY_LIST_PAGE_COUNT:
      return { ...state, cityListPageCount: action.cityListPageCount }
    case type.SET_CITY_LIST_FILTER:
      return { ...state, cityListFilter: action.cityListFilter }
    default:
      return state
  }
}

export default cityListReducer
