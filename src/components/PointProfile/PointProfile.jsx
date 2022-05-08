import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setCityList } from "../../store/cityListStore/actions"
import { getEditorData, setEditorData } from "../../store/editorStore/actions"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"
import { getLocalStorageData } from "../../utils/localStorage"
import Button from "../Button/Button"
import Input from "../Input/Input"
import cls from "./PointProfile.module.scss"

const PointProfile = () => {
  const navigate = useNavigate()
  const { pointId } = useParams()

  const dispatch = useDispatch()
  const [{ editorData }, { cityList }] = useSelector(
    ({ editorStore, cityListStore }) => [editorStore, cityListStore]
  )

  const token = getLocalStorageData("token")

  const [name, setName] = useState()
  const [cityId, setCityId] = useState()
  const [address, setAddress] = useState()

  const setInitialState = (editorData) => {
    setName(editorData?.name)
    setAddress(editorData.address)
    setCityId(editorData.cityId?.id)
  }

  const resetState = () => {
    setName("")
    setAddress("")
    setCityId(0)
  }

  useEffect(() => {
    cityList.length === 0 && dispatch(setCityList(token, "city"))
  }, [])

  useEffect(() => {
    setInitialState(editorData)
  }, [editorData])

  useEffect(() => {
    if (pointId) {
      dispatch(getEditorData(token, "point", pointId))
    } else {
      dispatch(setEditorData({}))
      resetState()
    }
  }, [pointId, token])

  const handleChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const handleChangeAddress = useCallback((e) => {
    setAddress(e.target.value)
  }, [])

  const handleChangeCity = useCallback((e) => {
    setCityId(e.target.value)
  }, [])

  const updatePointInfo = () => {
    const data = {
      name,
      address,
      cityId: {
        id: cityId,
      },
    }

    const method = pointId ? "PUT" : "POST"

    requestEditEntity(token, "point", method, data, pointId)
      .then((response) => response.json())
      .then((data) => {
        !pointId && navigate(`/admin/point-profile/${data.data.id}`)
        dispatch(setMessage("Успех! Пункт проката сохранен"))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const handleResetData = useCallback(() => {
    pointId ? setInitialState(editorData) : resetState()
  }, [editorData, pointId])

  const handleDeletePoint = useCallback(() => {
    requestDeleteEntity(token, "point", pointId)
      .then(() => {
        dispatch(setMessage("Успех! Пункт проката удален"))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/points")
  }, [pointId, token])

  return (
    <>
      <h1 className={cls.title}>Пункт проката</h1>
      <div className={cls.options}>
        <h2>Настройки пункта проката {name}</h2>
        <div className={cls.main}>
          <Input
            label={"Название"}
            customStyle={cls.fieldStyle}
            value={name}
            onChange={handleChangeName}
          />
          <Input
            label={"Адрес"}
            customStyle={cls.fieldStyle}
            value={address}
            onChange={handleChangeAddress}
          />
          <div className={`${cls.selectWrapper} ${cls.fieldStyle}`}>
            <span>Тип автомобиля</span>
            <select
              className={cls.select}
              defaultValue={0}
              onChange={handleChangeCity}
            >
              <option value={0}>Выберите город</option>
              {cityList?.map((city) => (
                <option
                  value={city.id}
                  key={city.id}
                  selected={city.id === cityId}
                >
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={cls.footer}>
          <Button
            text={"Сохранить"}
            customStyle={cls.button}
            onClick={updatePointInfo}
          />
          <Button text={"Отменить"} type="light" onClick={handleResetData} />
          <Button
            text={"Удалить"}
            type="reset"
            customStyle={cls.rightButton}
            onClick={handleDeletePoint}
          />
        </div>
      </div>
    </>
  )
}

export default PointProfile
