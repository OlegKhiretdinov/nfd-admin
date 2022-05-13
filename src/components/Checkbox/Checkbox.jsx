import cls from "./Checkbox.module.scss"

const Checkbox = ({ id, label, checked, ...rest }) => (
  <div className={cls.checkbox}>
    <input type="checkbox" id={id} defaultChecked={!!checked} {...rest} />
    <label htmlFor={id}>
      <span className={cls.customCheckbox} />
      {label}
    </label>
  </div>
)

export default Checkbox
