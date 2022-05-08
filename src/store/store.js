import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import authReducer from "./authStore/authStore"
import carsListReducer from "./carsListStore/carsListStore"
import carTypesReducer from "./carTypesStore/carTypesStore"
import cityListReducer from "./cityListStore/cityListStore"
import editorStoreReducer from "./editorStore/editorStore"
import messageReducer from "./messageStore/messageStore"
import ordersListReducer from "./ordersListStore/ordersListStore"
import pointsListReducer from "./PointListStore/PointListStore"

const reducers = combineReducers({
  auth: authReducer,
  ordersList: ordersListReducer,
  pointsList: pointsListReducer,
  carsList: carsListReducer,
  editorStore: editorStoreReducer,
  carTypesStore: carTypesReducer,
  messageStore: messageReducer,
  cityListStore: cityListReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
