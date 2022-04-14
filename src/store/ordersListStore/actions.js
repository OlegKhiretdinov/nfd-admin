import * as type from "./types"
import { tableOrder } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setOffset = (offset) => ({
  type: type.SET_OFFSET,
  offset,
})

const setOrdersListData = (ordersList) => ({
  type: type.SET_ORDERS_LIST,
  ordersList,
})

const setPageCount = (pageCount) => ({
  type: type.SET_PAGE_COUNT,
  pageCount,
})

export const setOrdersList =
  (token, offset = 20, filters = "") =>
  async (dispatch) => {
    const response = await tableOrder(token, offset, filters)
    dispatch(setOrdersListData(response.data))
    dispatch(setPageCount(Math.ceil(response.count / tableRowLimit)))
    setOrdersListData(response.data)
  }
