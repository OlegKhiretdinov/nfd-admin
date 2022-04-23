import classNames from "classnames"
import cls from "./Input.module.scss"

const Input = (props) => {
  const { value, label, id, fieldType, customStyle, error, ...rest } = props
  const classes = classNames(cls.wrapper, {
    [customStyle]: !!customStyle,
    [cls.error]: !!error,
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
      {error && <span className={cls.errorText}>{error}</span>}
    </div>
  )
}

export default Input
