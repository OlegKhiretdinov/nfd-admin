import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { getLocalStorageData } from "../../utils/localStorage"
import { TMessageType } from "../../utils/const"

const OrderStatusProfile = () => {
  const navigate = useNavigate()
  const { orderStatusId } = useParams()

  const dispatch = useDispatch()
  const { editorData } = useSelector(({ editorStore }) => editorStore)

  const token = getLocalStorageData("token")

  const [cityName, setName] = useState()

  const handleChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const resetState = () => {
    setName("")
  }

  const setInitialState = (data) => {
    setName(data.name)
  }

  useEffect(() => {
    setInitialState(editorData)
  }, [editorData])

  const updateCity = () => {
    const data = { name: cityName }
    const method = orderStatusId ? "PUT" : "POST"

    requestEditEntity(token, "orderStatus", method, data, orderStatusId)
      .then((response) => response.json())
      .then((data) => {
        !orderStatusId &&
          navigate(`/admin/order-status-profile/${data.data.id}`)
        dispatch(setMessage(`Успех! Статус заказа ${name} сохранен`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const resetData = () => {
    orderStatusId ? setInitialState(editorData) : resetState()
  }

  const deleteCity = useCallback(() => {
    requestDeleteEntity(token, "orderStatus", orderStatusId)
      .then(() => {
        dispatch(setMessage(`Успех! Статус заказа удален`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить статус заказа"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/order-status-list")
  }, [orderStatusId, token])

  return (
    <Profile
      title="Статус заказа"
      subTitle={`Профиль статуса заказа ${cityName ? cityName : ""}`}
      table="orderStatus"
      id={orderStatusId}
      resetState={resetState}
      handleUpdate={updateCity}
      handleReset={resetData}
      handleDelete={deleteCity}
    >
      <Input label={"Название"} value={cityName} onChange={handleChangeName} />
    </Profile>
  )
}

export default OrderStatusProfile
