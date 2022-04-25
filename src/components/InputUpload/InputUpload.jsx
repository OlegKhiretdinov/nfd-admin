import cls from "./InputUpload.module.scss"

const InputUpload = ({ fileName, ...rest }) => {
  return (
    <>
      <input className={cls.invisible} type="file" id="file" {...rest} />
      <label htmlFor="file">
        <div className={cls.input}>
          <div className={cls.field}>{fileName || "Выберите файл"}</div>
          <div className={cls.button}>Обзор</div>
        </div>
      </label>
    </>
  )
}

export default InputUpload
