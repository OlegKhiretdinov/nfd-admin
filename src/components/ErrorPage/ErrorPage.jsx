import { useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import cls from "./ErrorPage.module.scss"

const ErrorPage = () => {
  const navigation = useNavigate()
  return (
    <div className={cls.wrapper}>
      <div className={cls.errorCode}>500</div>
      <h1 className={cls.title}>Что-то пошло не так</h1>
      <div className={cls.text}>Попробуйте перезагрузить страницу</div>
      <Button
        text={"Назад"}
        customStyle={cls.button}
        onClick={() => {
          navigation(-1)
        }}
      />
    </div>
  )
}

export default ErrorPage
