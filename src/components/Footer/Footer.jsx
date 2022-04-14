import { Link } from "react-router-dom"
import cls from "./Footer.module.scss"

const Footer = () => (
  <div className={cls.wrapper}>
    <div className={cls.footerMenu}>
      <Link to={"/"}>Главная страница</Link>
      <Link to={"#"}>Ссылка</Link>
    </div>
    <div className={cls.copyright}>Copyright © 2020 SimbirSoft</div>
  </div>
)

export default Footer
