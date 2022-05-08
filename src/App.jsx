import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "./components/AdminPage/AdminPage"
import CarProfile from "./components/CarProfile/CarProfile"
import CarsList from "./components/CarsList/CarsList"
import ErrorPage from "./components/ErrorPage/ErrorPage"
import OrderList from "./components/OrderList/OrderList"
import PointList from "./components/PointList/PointList"
import PointProfile from "./components/PointProfile/PointProfile"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="/admin" element={<Navigate to="/admin/orders" />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="points" element={<PointList />} />
          <Route path="cars" element={<CarsList />} />
          <Route path="car-profile/" element={<CarProfile />} />
          <Route path="car-profile/:carId" element={<CarProfile />} />
          <Route path="point-profile/" element={<PointProfile />} />
          <Route path="point-profile/:pointId" element={<PointProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
