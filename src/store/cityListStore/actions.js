import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"
import * as type from "./type"

const setCityListData = (cityList) => ({
  type: type.SET_CITY_LIST,
  cityList,
})

export const setCityList = (page, filter) => async (dispatch) => {
  const response = await requestTableData("city", page, filter)
  dispatch(setCityListData(response.data))
  dispatch(setCityListPageCount(Math.ceil(response.count / tableRowLimit)))
}

export const setCityListPage = (cityListPage) => ({
  type: type.SET_CITY_LIST_PAGE,
  cityListPage,
})

export const setCityListPageCount = (cityListPageCount) => ({
  type: type.SET_CITY_LIST_PAGE_COUNT,
  cityListPageCount,
})

export const setCityListFilter = (cityListFilter) => ({
  type: type.SET_CITY_LIST_FILTER,
  cityListFilter,
})
