import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "./components/AdminPage/AdminPage"
import CarCategoryProfile from "./components/CarCategoryProfile/CarCategoryProfile"
import CarProfile from "./components/CarProfile/CarProfile"
import CarsList from "./components/CarsList/CarsList"
import CategoryList from "./components/CategoryList/CategoryList"
import CityList from "./components/CityList/CityList"
import CityProfile from "./components/CityProfile/CityProfile"
import ErrorPage from "./components/ErrorPage/ErrorPage"
import OrderList from "./components/OrderList/OrderList"
import OrderStatusProfile from "./components/OrderStatusProfile/OrderStatusProfile"
import PointList from "./components/PointList/PointList"
import PointProfile from "./components/PointProfile/PointProfile"
import RateProfile from "./components/RateProfile/RateProfile"
import RateTypeProfile from "./components/RateTypeProfile/RateTypeProfile"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="/admin" element={<Navigate to="/admin/orders" />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="points" element={<PointList />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="cars" element={<CarsList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="car-profile/" element={<CarProfile />} />
          <Route path="car-profile/:carId" element={<CarProfile />} />
          <Route path="point-profile/" element={<PointProfile />} />
          <Route path="point-profile/:pointId" element={<PointProfile />} />
          <Route path="category-profile/" element={<CarCategoryProfile />} />
          <Route
            path="category-profile/:categoryId"
            element={<CarCategoryProfile />}
          />
          <Route path="city-profile/" element={<CityProfile />} />
          <Route path="city-profile/:cityId" element={<CityProfile />} />
          <Route path="rate-type-profile/" element={<RateTypeProfile />} />
          <Route
            path="rate-type-profile/:rateTypeId"
            element={<RateTypeProfile />}
          />
          <Route path="rate-profile/" element={<RateProfile />} />
          <Route path="rate-profile/:rateId" element={<RateProfile />} />
          <Route
            path="order-status-profile/"
            element={<OrderStatusProfile />}
          />
          <Route
            path="order-status-profile/:orderStatusId"
            element={<OrderStatusProfile />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
