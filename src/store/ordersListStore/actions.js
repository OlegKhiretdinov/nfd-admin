import * as type from "./types"
import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setOrdersPage = (ordersPage) => ({
  type: type.SET_ORDERS_PAGE,
  ordersPage,
})

const setOrdersListData = (ordersList) => ({
  type: type.SET_ORDERS_LIST,
  ordersList,
})

const setOrderPageCount = (orderPageCount) => ({
  type: type.SET_ORDERS_PAGE_COUNT,
  orderPageCount,
})

export const setOrdersList = (table, page) => async (dispatch) => {
  const response = await requestTableData(table, page)
  dispatch(setOrdersListData(response.data))
  dispatch(setOrderPageCount(Math.ceil(response.count / tableRowLimit)))
}
