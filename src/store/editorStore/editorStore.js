import * as type from "./types"

const initialState = {
  editorData: {},
}

const editorStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ENTITY_DATA:
      return { ...state, editorData: action.editorData }
    default:
      return state
  }
}

export default editorStoreReducer
