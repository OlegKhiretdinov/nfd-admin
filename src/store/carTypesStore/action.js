import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"
import * as type from "./type"

const setCarTypesData = (carTypes) => ({
  type: type.SET_CAR_TYPE,
  carTypes,
})

const setCarTypesPageCount = (carTypesCount) => ({
  type: type.SET_CAR_TYPE_PAGE_COUNT,
  carTypesCount,
})

export const setCarTypes = (page, filter) => async (dispatch) => {
  const response = await requestTableData("category", page, filter)
  dispatch(setCarTypesData(response.data))
  dispatch(setCarTypesPageCount(Math.ceil(response.count / tableRowLimit)))
}

export const setCarTypesPage = (carTypesPage) => ({
  type: type.SET_CAR_TYPE_PAGE,
  carTypesPage,
})

export const setCarTypesFilter = (carTypesFilter) => ({
  type: type.SET_CAR_TYPE_FILTER,
  carTypesFilter,
})
