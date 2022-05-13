import LoginPage from "../LoginPage/LoginPage"
import {
  getLocalStorageData,
  removeLocalStorageData,
} from "../../utils/localStorage"
import { useDispatch, useSelector } from "react-redux"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { setAuthToken } from "../../store/authStore/actions"
import NavigationPanel from "../NavigationPanel/NavigationPanel"
import cls from "./AdminPage.module.scss"
import { Outlet } from "react-router-dom"
import Message from "../Message/Message"

const AdminPage = () => {
  const dispatch = useDispatch()
  let token = useSelector(({ auth }) => auth.token)
  const localStorageToken = getLocalStorageData("token")
  const tokenExpiresDate = getLocalStorageData("expires_date")

  if (!token && localStorageToken) {
    if (tokenExpiresDate > Date.now()) {
      dispatch(setAuthToken(localStorageToken))
    } else {
      dispatch(setAuthToken(""))
      removeLocalStorageData("token")
      removeLocalStorageData("expires_date")
    }
  }

  if (!token) {
    return <LoginPage />
  }
  return (
    <div className={cls.wrapper}>
      <NavigationPanel />
      <div className={cls.main}>
        <Header />
        <div className={cls.content}>
          <Message />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AdminPage
