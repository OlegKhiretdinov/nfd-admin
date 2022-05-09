import { useCallback, useEffect, useMemo, useState } from "react"
import { NavLink } from "react-router-dom"
import classNames from "classnames"
import { getScreenType } from "../../utils/utils"
import cls from "./NavigationPanel.module.scss"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg"
import { ReactComponent as ListSvg } from "../../assets/icons/list.svg"
import { ReactComponent as OrderSvg } from "../../assets/icons/order.svg"
import MenuTrigger from "../MenuTrigger/MenuTriger"

const navigationConfig = [
  {
    title: "Заказы",
    link: "/admin/orders",
    icon: <OrderSvg />,
  },
  {
    title: "Список авто",
    link: "/admin/cars",
    icon: <ListSvg />,
  },
  {
    title: "Пункты проката",
    link: "/admin/points",
    icon: <ListSvg />,
  },
  {
    title: "Карточка автомобиля",
    link: "/admin/car-profile",
    icon: <EditSvg />,
  },
  {
    title: "Карточка пункта проката",
    link: "/admin/point-profile",
    icon: <EditSvg />,
  },
  {
    title: "Карточка категории",
    link: "/admin/category-profile",
    icon: <EditSvg />,
  },
  {
    title: "Карточка города",
    link: "/admin/city-profile",
    icon: <EditSvg />,
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

  const getLinkClass = (isActive) =>
    classNames(cls.link, { [cls.activeLink]: isActive })

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
              <NavLink
                className={({ isActive }) => getLinkClass(isActive)}
                to={item.link}
                onClick={() => {
                  setIsShowMenu(false)
                }}
              >
                {item.icon}
                {item.title}
              </NavLink>
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
