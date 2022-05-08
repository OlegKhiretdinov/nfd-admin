import { requestTableData } from "../../api/request"
import * as type from "./type"

const setCityListData = (cityList) => ({
  type: type.SET_CITY_LIST,
  cityList,
})

export const setCityList =
  (token, table, offset = 0) =>
  async (dispatch) => {
    const response = await requestTableData(token, table, offset)
    dispatch(setCityListData(response.data))
  }
