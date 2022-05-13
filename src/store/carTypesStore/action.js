import { requestTableData } from "../../api/request"
import * as type from "./type"

const setCarTypesData = (carTypes) => ({
  type: type.SET_CAR_TYPE,
  carTypes,
})

export const setCarTypes = (table, page) => async (dispatch) => {
  const response = await requestTableData(table, page)
  dispatch(setCarTypesData(response.data))
}
