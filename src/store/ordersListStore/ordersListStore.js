import * as type from "./types"

const initialState = {
  orderOffset: 0,
  orderPageCount: 0,
  ordersList: [],
}

const ordersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ORDERS_OFFSET:
      return { ...state, orderOffset: action.orderOffset }
    case type.SET_ORDERS_LIST:
      return { ...state, ordersList: action.ordersList }
    case type.SET_ORDERS_PAGE_COUNT:
      return { ...state, orderPageCount: action.orderPageCount }
    default:
      return state
  }
}

export default ordersListReducer
