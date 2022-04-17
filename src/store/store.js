import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import authReducer from "./authStore/authStore"
import ordersListReducer from "./ordersListStore/ordersListStore"
import pointsListReducer from "./PointListStore/PointListStore"

const reducers = combineReducers({
  auth: authReducer,
  ordersList: ordersListReducer,
  pointsList: pointsListReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
