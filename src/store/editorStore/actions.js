import { requestGetEntity } from "../../api/request"
import * as type from "./types"

export const setEditorData = (editorData) => ({
  type: type.SET_ENTITY_DATA,
  editorData,
})

export const getEditorData = (table, id) => async (dispatch) => {
  const response = await requestGetEntity(table, id)
  dispatch(setEditorData(response.data))
}
