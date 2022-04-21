import * as type from "./types"
import { requestTableData } from "../../api/request"
import { tableRowLimit } from "../../utils/const"

export const setPointsOffset = (pointsOffset) => ({
  type: type.SET_POINTS_OFFSET,
  pointsOffset,
})

const setPointsListData = (pointsList) => ({
  type: type.SET_POINTS_LIST,
  pointsList,
})

const setPointsPageCount = (pointsPageCount) => ({
  type: type.SET_POINTS_PAGE_COUNT,
  pointsPageCount,
})

export const setPointsList =
  (token, table, offset = 0, filters = "") =>
  async (dispatch) => {
    const response = await requestTableData(token, table, offset, filters)
    dispatch(setPointsListData(response.data))
    dispatch(setPointsPageCount(Math.ceil(response.count / tableRowLimit)))
  }
