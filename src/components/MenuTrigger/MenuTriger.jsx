import cls from "./MenuTrigger.module.scss"

const MenuMenuTrigger = ({ isShowMenu, setIsShowMenu }) => {
  const handleTriggerMenuClick = () => {
    setIsShowMenu(!isShowMenu)
  }

  return (
    <>
      <div onClick={handleTriggerMenuClick} className={cls.wrapper}>
        <div
          className={`${cls.trigger} ${isShowMenu ? cls.open : cls.close}`}
        />
      </div>
    </>
  )
}
export default MenuMenuTrigger
