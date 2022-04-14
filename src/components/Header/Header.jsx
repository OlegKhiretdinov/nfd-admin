import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg"
import { ReactComponent as NotificationsSvg } from "../../assets/icons/notifications.svg"
import { ReactComponent as DropdownSvg } from "../../assets/icons/dropdown.svg"
import userPic from "../../assets/img/user-avatar.jpg"
import cls from "./Header.module.scss"

const Header = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.search}>
        <SearchSvg />
        <input
          type="text"
          placeholder="Поиск ..."
          className={cls.searchInput}
        />
      </div>
      <div className={cls.info}>
        <div className={cls.notification}>
          <NotificationsSvg />
          <div className={cls.count}>
            <span>2</span>
          </div>
        </div>
        <div className={cls.user}>
          <div
            className={cls.avatar}
            style={{ background: `url(${userPic}) center/cover` }}
          />
          <div className={cls.userName}>Admin</div>
          <DropdownSvg />
        </div>
      </div>
    </div>
  )
}

export default Header
