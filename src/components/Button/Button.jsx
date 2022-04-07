import classNames from "classnames"
import cls from "./Button.module.scss"

const Button = ({ type, text, customStyle }) => {
  const classes = classNames(cls.default, {
    [cls.reset]: type === "reset",
    [cls.light]: type === "light",
    [customStyle]: !!customStyle,
  })
  return <button className={classes}>{text}</button>
}

export default Button
