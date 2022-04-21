import * as type from "./types"

const initialState = {
  pointsOffset: 0,
  pointsPageCount: 0,
  pointsList: [],
}

const pointsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_POINTS_OFFSET:
      return { ...state, pointsOffset: action.pointsOffset }
    case type.SET_POINTS_LIST:
      return { ...state, pointsList: action.pointsList }
    case type.SET_POINTS_PAGE_COUNT:
      return { ...state, pointsPageCount: action.pointsPageCount }
    default:
      return state
  }
}

export default pointsListReducer
