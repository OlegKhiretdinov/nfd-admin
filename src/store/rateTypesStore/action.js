import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"
import * as type from "./types"

const setRateTypesData = (rateTypes) => ({
  type: type.SET_RATE_TYPE,
  rateTypes,
})

const setRateTypesPageCount = (rateTypesPageCount) => ({
  type: type.SET_RATE_TYPE_PAGE_COUNT,
  rateTypesPageCount,
})

export const setRateTypes = (page, filter) => async (dispatch) => {
  const response = await requestTableData("rateType", page, filter)
  dispatch(setRateTypesData(response.data))
  dispatch(setRateTypesPageCount(Math.ceil(response.count / tableRowLimit)))
}

export const setRateTypesPage = (rateTypesPage) => ({
  type: type.SET_RATE_TYPE_PAGE,
  rateTypesPage,
})

export const setRateTypesFilter = (rateTypesFilter) => ({
  type: type.SET_RATE_TYPE_FILTER,
  rateTypesFilter,
})
