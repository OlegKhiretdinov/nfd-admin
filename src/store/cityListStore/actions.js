import { requestTableData } from "../../api/request"
import * as type from "./type"

const setCityListData = (cityList) => ({
  type: type.SET_CITY_LIST,
  cityList,
})

export const setCityList = (table) => async (dispatch) => {
  const response = await requestTableData(table)
  dispatch(setCityListData(response.data))
}
