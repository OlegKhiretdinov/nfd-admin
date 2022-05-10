import * as type from "./types"
import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setCarsListPage = (carListPage) => ({
  type: type.SET_CARS_LIST_PAGE,
  carListPage,
})

const setCarsListData = (carsList) => ({
  type: type.SET_CARS_LIST,
  carsList,
})

const setCarsPageCount = (carsPageCount) => ({
  type: type.SET_CARS_PAGE_COUNT,
  carsPageCount,
})

export const setCarsList =
  (token, table, page, filters = "") =>
  async (dispatch) => {
    const response = await requestTableData(token, table, page, filters)
    dispatch(setCarsListData(response.data))
    dispatch(setCarsPageCount(Math.ceil(response.count / tableRowLimit)))
  }
