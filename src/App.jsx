import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "./components/AdminPage/AdminPage"
import OrderList from "./components/OrderList/OrderList"
import PointList from "./components/PointList/PointList"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="/admin" element={<Navigate to="/admin/orders" />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="points" element={<PointList />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
