import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"

const CarCategoryProfile = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const dispatch = useDispatch()
  const { editorData } = useSelector(({ editorStore }) => editorStore)

  const [name, setName] = useState()
  const [description, setDescription] = useState()

  const handleChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value)
  }, [])

  const resetState = () => {
    setName("")
    setDescription("")
  }

  const setInitialState = (data) => {
    setName(data.name)
    setDescription(data.description)
  }

  useEffect(() => {
    setInitialState(editorData)
  }, [editorData])

  const updateCategory = () => {
    const data = { name, description }
    const method = categoryId ? "PUT" : "POST"

    requestEditEntity("category", method, data, categoryId)
      .then(() => {
        navigate(`/admin/categories`)
        dispatch(setMessage(`Успех! Категория ${name} сохранена`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const resetData = useCallback(() => {
    categoryId ? setInitialState(editorData) : resetState()
  }, [editorData, categoryId])

  const handleDeleteCategory = useCallback(() => {
    requestDeleteEntity("category", categoryId)
      .then(() => {
        dispatch(setMessage(`Успех! Категория удалена`))
        dispatch(setMessageType(TMessageType.success))
        navigate("/admin/categories")
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить категорию"))
        dispatch(setMessageType(TMessageType.error))
      })
  }, [categoryId])

  return (
    <Profile
      title="Категория машины"
      subTitle={`Профиль категории ${name ? name : ""}`}
      table="category"
      id={categoryId}
      resetState={resetState}
      handleUpdate={updateCategory}
      handleReset={resetData}
      handleDelete={handleDeleteCategory}
    >
      <Input label={"Название"} value={name} onChange={handleChangeName} />
      <Input
        label={"Описание"}
        value={description}
        onChange={handleChangeDescription}
      />
    </Profile>
  )
}

export default CarCategoryProfile
