import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { login } from "../../store/authStore/actions"
import Button from "../Button/Button"
import Input from "../Input/Input"
import cls from "./LoginPage.module.scss"

const LoginPage = () => {
  const dispatch = useDispatch()
  const loginError = useSelector(({ auth }) => auth.errors)

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(login(e.target[0].value, e.target[1].value))
    },
    [dispatch]
  )

  return (
    <div className={cls.page}>
      <div className={cls.header}>
        <Logo className={cls.logo} />
        <h1>Need for drive</h1>
      </div>
      <div className={cls.formWrapper}>
        <h2>Вход</h2>
        <form className={cls.form} onSubmit={onFormSubmit}>
          <div className={cls.errors}>{loginError}</div>
          <Input label={"Почта"} id={"mail"} customStyle={cls.input} />
          <Input
            label={"Пароль"}
            id={"password"}
            fieldType={"password"}
            customStyle={cls.input}
          />
          <div className={cls.footer}>
            <a href="#">Запросить доступ</a>
            <Button text={"Войти"} customStyle={cls.button} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
