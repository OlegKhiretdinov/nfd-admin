import * as type from "./types"
import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setPointsOffset = (carsOffset) => ({
  type: type.SET_CARS_OFFSET,
  carsOffset,
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
  (token, table, offset = 0, filters = "") =>
  async (dispatch) => {
    const response = await requestTableData(token, table, offset, filters)
    dispatch(setCarsListData(response.data))
    dispatch(setCarsPageCount(Math.ceil(response.count / tableRowLimit)))
  }
