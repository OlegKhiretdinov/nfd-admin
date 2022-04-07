import classNames from "classnames"
import cls from "./Input.module.scss"

const Input = (props) => {
  const { value, label, id, fieldType, customStyle, ...rest } = props
  const classes = classNames(cls.wrapper, {
    [customStyle]: !!customStyle,
  })
  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input
        className={cls.default}
        value={value}
        id={id}
        type={fieldType}
        {...rest}
      />
    </div>
  )
}

export default Input
