import { requestTableData } from "../../api/request"
import * as type from "./types"

const setRateTypesData = (rateTypes) => ({
  type: type.SET_RATE_TYPE,
  rateTypes,
})

export const setRateTypes = (table, page) => async (dispatch) => {
  const response = await requestTableData(table, page)
  dispatch(setRateTypesData(response.data))
}
