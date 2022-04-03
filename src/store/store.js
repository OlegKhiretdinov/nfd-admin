import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import authReducer from "./authStore"

const reducers = combineReducers({
  auth: authReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
