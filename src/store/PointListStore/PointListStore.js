import * as type from "./types"

const initialState = {
  pointsPage: 0,
  pointsPageCount: 0,
  pointsList: [],
  pointsFilter: "",
}

const pointsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_POINTS_PAGE:
      return { ...state, pointsPage: action.pointsPage }
    case type.SET_POINTS_LIST:
      return { ...state, pointsList: action.pointsList }
    case type.SET_POINTS_PAGE_COUNT:
      return { ...state, pointsPageCount: action.pointsPageCount }
    case type.SET_POINTS_FILTER:
      return { ...state, pointsFilter: action.pointsFilter }
    default:
      return state
  }
}

export default pointsListReducer
