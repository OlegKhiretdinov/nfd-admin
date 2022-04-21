import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getScreenType } from "../../utils/utils"
import cls from "./NavigationPanel.module.scss"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg"
import { ReactComponent as ListSvg } from "../../assets/icons/list.svg"
import { ReactComponent as OrderSvg } from "../../assets/icons/order.svg"
import MenuTrigger from "../MenuTrigger/MenuTriger"

const navigationConfig = [
  {
    title: "Карточка автомобиля",
    link: "url1",
    icon: <EditSvg />,
  },
  {
    title: "Список авто",
    link: "/admin/cars",
    icon: <ListSvg />,
  },
  {
    title: "Заказы",
    link: "/admin/orders",
    icon: <OrderSvg />,
  },
  {
    title: "Пункты проката",
    link: "/admin/points",
    icon: <OrderSvg />,
  },
]

const NavigationPanel = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [devise, setDevise] = useState(getScreenType(window))

  const handelResize = useCallback(() => {
    getScreenType(window) !== devise && setDevise(getScreenType(window))
  }, [devise])

  useEffect(() => {
    window.addEventListener("resize", handelResize)
    return () => {
      window.removeEventListener("resize", handelResize)
    }
  }, [handelResize])

  const navPanel = useMemo(
    () => (
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
    ),
    []
  )

  if (devise === "deskTop") {
    return navPanel
  }

  return (
    <>
      <MenuTrigger isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      {isShowMenu ? (
        <>
          <div className={cls.overlay} />
          {navPanel}
        </>
      ) : null}
    </>
  )
}

export default NavigationPanel
