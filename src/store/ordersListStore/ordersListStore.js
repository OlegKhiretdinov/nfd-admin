import * as type from "./types"

const initialState = {
  offset: 0,
  pageCount: 0,
  ordersList: [],
}

const ordersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_OFFSET:
      return { ...state, offset: action.offset }
    case type.SET_ORDERS_LIST:
      return { ...state, ordersList: action.ordersList }
    case type.SET_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount }
    default:
      return state
  }
}

export default ordersListReducer
