import cls from "./ProgressBar.module.scss"

const ProgressBar = ({ text, percent }) => {
  return (
    <div>
      <div className={cls.title}>
        <span>{text}</span>
        <span>{`${percent}%`}</span>
      </div>
      <div className={cls.bar}>
        <div className={cls.progress} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
