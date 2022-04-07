import { Link } from "react-router-dom"
import cls from "./NavigationPanel.module.scss"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg"
import { ReactComponent as ListSvg } from "../../assets/icons/list.svg"
import { ReactComponent as OrderSvg } from "../../assets/icons/order.svg"

const navigationConfig = [
  {
    title: "Карточка автомобиля",
    link: "url1",
    icon: <EditSvg />,
  },
  {
    title: "Список авто",
    link: "url2",
    icon: <ListSvg />,
  },
  {
    title: "Заказы",
    link: "url3",
    icon: <OrderSvg />,
  },
]

const NavigationPanel = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <Logo className={cls.logo} />{" "}
        <h3 className={cls.title}>Need for drive</h3>
      </div>
      <div>
        {navigationConfig.map((item) => (
          <div key={item.link}>
            <Link className={cls.link} to={item.link}>
              {item.icon}
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavigationPanel
