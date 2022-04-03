import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminPage from "./components/AdminPage/AdminPage"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route exact path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
