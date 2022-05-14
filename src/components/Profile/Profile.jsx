import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getEditorData, setEditorData } from "../../store/editorStore/actions"
import Button from "../Button/Button"
import cls from "./Profile.module.scss"

const Profile = (props) => {
  const {
    title,
    subTitle,
    handleUpdate,
    handleReset,
    handleDelete,
    children,
    table,
    id,
    resetState,
  } = props

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getEditorData(table, id))
    } else {
      dispatch(setEditorData({}))
      resetState()
    }
  }, [])

  return (
    <>
      <h1 className={cls.title}>{title}</h1>
      <div className={cls.options}>
        <h2>{subTitle}</h2>
        <div className={cls.main}>{children}</div>
        <div className={cls.footer}>
          <Button
            text={"Сохранить"}
            customStyle={cls.button}
            onClick={handleUpdate}
          />
          <Button text={"Отменить"} type="light" onClick={handleReset} />
          <Button
            text={"Удалить"}
            type="reset"
            customStyle={cls.rightButton}
            disabled={!id}
            onClick={handleDelete}
          />
        </div>
      </div>
    </>
  )
}

export default Profile
