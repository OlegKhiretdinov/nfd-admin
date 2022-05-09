import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"
import { getLocalStorageData } from "../../utils/localStorage"

const CarCategoryProfile = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const dispatch = useDispatch()
  const { editorData } = useSelector(({ editorStore }) => editorStore)

  const token = getLocalStorageData("token")

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

    requestEditEntity(token, "category", method, data, categoryId)
      .then((response) => response.json())
      .then((data) => {
        !categoryId && navigate(`/admin/category-profile/${data.data.id}`)
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
    requestDeleteEntity(token, "category", categoryId)
      .then(() => {
        dispatch(setMessage(`Успех! Категория ${name} удалена`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить категорию"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/categories")
  }, [categoryId, token])

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
