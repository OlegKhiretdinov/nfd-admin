import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import Button from "../Button/Button"
import Input from "../Input/Input"
import cls from "./LoginPage.module.scss"

const LoginPage = () => {
  return (
    <div className={cls.page}>
      <div className={cls.header}>
        <Logo />
        <h1>Need for drive</h1>
      </div>
      <div className={cls.formWrapper}>
        <h2>Вход</h2>
        <form className={cls.form}>
          <Input
            label={"Почта"}
            id={"mail"}
            fieldType={"email"}
            placeholder={"admin@ss.com"}
            customStyle={cls.input}
          />
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
