import * as type from "./type"

const initialState = {
  carTypes: [],
  carTypesPage: 0,
  carTypesCount: 0,
  carTypesFilter: "",
}

const carTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_CAR_TYPE:
      return { ...state, carTypes: action.carTypes }
    case type.SET_CAR_TYPE_PAGE:
      return { ...state, carTypesPage: action.carTypesPage }
    case type.SET_CAR_TYPE_PAGE_COUNT:
      return { ...state, carTypesCount: action.carTypesCount }
    case type.SET_CAR_TYPE_FILTER:
      return { ...state, carTypesFilter: action.carTypesFilter }
    default:
      return state
  }
}

export default carTypesReducer
