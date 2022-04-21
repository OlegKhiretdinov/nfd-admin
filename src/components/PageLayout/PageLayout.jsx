import cls from "./PageLayout.module.scss"

const PageLayout = ({ title, children }) => (
  <div>
    <h1 className={cls.title}>{title}</h1>
    <div className={cls.wrapper}>{children}</div>
  </div>
)

export default PageLayout
