import LoginPage from "../LoginPage/LoginPage"
import { getLocalStorageAuthToken } from "../../utils/localStorage"
import { useDispatch, useSelector } from "react-redux"
import { setAuthToken } from "../../store/authStore"

const AdminPage = () => {
  const dispatch = useDispatch()
  let token = useSelector(({ auth }) => auth.token)
  const localStorageToken = getLocalStorageAuthToken()

  if (!token && localStorageToken) {
    dispatch(setAuthToken(localStorageToken))
  }

  return token ? <h1>AdminPage</h1> : <LoginPage />
}

export default AdminPage
