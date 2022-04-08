import LoginPage from "../LoginPage/LoginPage"
import { getLocalStorageAuthToken } from "../../utils/localStorage"
import { useDispatch, useSelector } from "react-redux"
import { setAuthToken } from "../../store/authStore/actions"
import NavigationPanel from "../NavigationPanel/NavigationPanel"
import cls from "./AdminPage.module.scss"
import Header from "../Header/Header"

const AdminPage = () => {
  const dispatch = useDispatch()
  let token = useSelector(({ auth }) => auth.token)
  const localStorageToken = getLocalStorageAuthToken()

  if (!token && localStorageToken) {
    dispatch(setAuthToken(localStorageToken))
  }

  if (!token) {
    return <LoginPage />
  }
  return (
    <div className={cls.wrapper}>
      <NavigationPanel />
      <div className={cls.main}>
        <Header />
      </div>
    </div>
  )
}

export default AdminPage
