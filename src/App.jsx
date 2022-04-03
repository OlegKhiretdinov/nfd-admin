import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "./components/AdminPage/AdminPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route exact path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
