import * as type from "./types"
import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setPointsPage = (pointsPage) => ({
  type: type.SET_POINTS_PAGE,
  pointsPage,
})

const setPointsListData = (pointsList) => ({
  type: type.SET_POINTS_LIST,
  pointsList,
})

const setPointsPageCount = (pointsPageCount) => ({
  type: type.SET_POINTS_PAGE_COUNT,
  pointsPageCount,
})

export const setPointsList = (table, page) => async (dispatch) => {
  const response = await requestTableData(table, page)
  dispatch(setPointsListData(response.data))
  dispatch(setPointsPageCount(Math.ceil(response.count / tableRowLimit)))
}
