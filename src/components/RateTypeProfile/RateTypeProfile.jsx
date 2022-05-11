import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"

const RateTypeProfile = () => {
  const navigate = useNavigate()
  const { rateTypeId } = useParams()

  const dispatch = useDispatch()
  const { editorData } = useSelector(({ editorStore }) => editorStore)

  const [name, setName] = useState()
  const [unit, setUnit] = useState()

  const handleChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const handleChangeDescription = useCallback((e) => {
    setUnit(e.target.value)
  }, [])

  const resetState = () => {
    setName("")
    setUnit("")
  }

  const setInitialState = (data) => {
    setName(data.name)
    setUnit(data.unit)
  }

  useEffect(() => {
    setInitialState(editorData)
  }, [editorData])

  const updateCategory = () => {
    const data = { name, unit }
    const method = rateTypeId ? "PUT" : "POST"

    requestEditEntity("rateType", method, data, rateTypeId)
      .then((response) => response.json())
      .then((data) => {
        !rateTypeId && navigate(`/admin/rate-type-profile/${data.data.id}`)
        dispatch(setMessage(`Успех! Тип тарифа ${name} сохранен`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const resetData = useCallback(() => {
    rateTypeId ? setInitialState(editorData) : resetState()
  }, [editorData, rateTypeId])

  const handleDeleteCategory = useCallback(() => {
    requestDeleteEntity("rateType", rateTypeId)
      .then(() => {
        dispatch(setMessage(`Успех! Тип тарифа удален`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить категорию"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/rate-types")
  }, [rateTypeId])

  return (
    <Profile
      title="Категория машины"
      subTitle={`Профиль категории ${name ? name : ""}`}
      table="rateType"
      id={rateTypeId}
      resetState={resetState}
      handleUpdate={updateCategory}
      handleReset={resetData}
      handleDelete={handleDeleteCategory}
    >
      <Input label={"Название"} value={name} onChange={handleChangeName} />
      <Input
        label={"Единица измерения"}
        value={unit}
        onChange={handleChangeDescription}
      />
    </Profile>
  )
}

export default RateTypeProfile
