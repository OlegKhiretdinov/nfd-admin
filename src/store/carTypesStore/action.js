import { requestTableData } from "../../api/request"
import * as type from "./type"

const setCarTypesData = (carTypes) => ({
  type: type.SET_CAR_TYPE,
  carTypes,
})

export const setCarTypes =
  (token, table, offset = 0) =>
  async (dispatch) => {
    const response = await requestTableData(token, table, offset)
    dispatch(setCarTypesData(response.data))
  }
