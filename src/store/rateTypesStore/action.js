import { requestTableData } from "../../api/request"
import * as type from "./types"

const setRateTypesData = (rateTypes) => ({
  type: type.SET_RATE_TYPE,
  rateTypes,
})

export const setRateTypes =
  (token, table, offset = 0) =>
  async (dispatch) => {
    const response = await requestTableData(token, table, offset)
    dispatch(setRateTypesData(response.data))
  }
