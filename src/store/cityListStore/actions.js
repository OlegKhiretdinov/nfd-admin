import { requestTableData } from "../../api/request"
import * as type from "./type"

const setCityListData = (cityList) => ({
  type: type.SET_CITY_LIST,
  cityList,
})

export const setCityList = (table, page) => async (dispatch) => {
  const response = await requestTableData(table, page)
  dispatch(setCityListData(response.data))
}
