import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { getLocalStorageData } from "../../utils/localStorage"
import { TMessageType } from "../../utils/const"

const CityProfile = () => {
  const navigate = useNavigate()
  const { cityId } = useParams()

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
    const method = cityId ? "PUT" : "POST"

    requestEditEntity(token, "city", method, data, cityId)
      .then((response) => response.json())
      .then((data) => {
        !cityId && navigate(`/admin/city-profile/${data.data.id}`)
        dispatch(setMessage(`Успех! Категория ${name} сохранена`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const resetData = () => {
    cityId ? setInitialState(editorData) : resetState()
  }

  const deleteCity = useCallback(() => {
    requestDeleteEntity(token, "city", cityId)
      .then(() => {
        dispatch(setMessage(`Успех! Город ${cityName} удален`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить город"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/cities")
  }, [cityId, token])

  return (
    <Profile
      title="Город"
      subTitle={`Профиль Города ${cityName ? cityName : ""}`}
      table="city"
      id={cityId}
      resetState={resetState}
      handleUpdate={updateCity}
      handleReset={resetData}
      handleDelete={deleteCity}
    >
      <Input label={"Название"} value={cityName} onChange={handleChangeName} />
    </Profile>
  )
}

export default CityProfile
