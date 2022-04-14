import cls from "./Checkbox.module.scss"

const Checkbox = ({ id, label, checked }) => (
  <div className={cls.checkbox}>
    <input type="checkbox" id={id} defaultChecked={!!checked} />
    <label htmlFor={id}>
      <span className={cls.customCheckbox} />
      {label}
    </label>
  </div>
)

export default Checkbox
