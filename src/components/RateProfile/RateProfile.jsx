import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Profile from "../Profile/Profile"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { setRateTypes } from "../../store/rateTypesStore/action"
import { TMessageType } from "../../utils/const"
import cls from "./RateProfile.module.scss"

const RateProfile = () => {
  const navigate = useNavigate()
  const { rateId } = useParams()

  const dispatch = useDispatch()
  const [{ editorData }, { rateTypes }] = useSelector(
    ({ editorStore, rateTypesStore }) => [editorStore, rateTypesStore]
  )

  const [rateTypeId, setRateId] = useState()
  const [price, setPrice] = useState()

  const setInitialState = (data) => {
    setPrice(data.price)
    setRateId(data.rateTypeId?.id)
  }

  const resetState = () => {
    setRateId(0)
    setPrice("")
  }

  useEffect(() => {
    dispatch(setRateTypes("rateType"))
  }, [])

  useEffect(() => {
    setInitialState(editorData)
  }, [editorData])

  const handleChangePrice = useCallback((e) => {
    setPrice(e.target.value)
  }, [])

  const handleChangeRateType = useCallback((e) => {
    setRateId(e.target.value)
  }, [])

  const updateRate = () => {
    const data = {
      price,
      rateTypeId: {
        id: rateTypeId,
      },
    }

    const method = rateId ? "PUT" : "POST"

    requestEditEntity("rate", method, data, rateId)
      .then(() => {
        !rateId && navigate(`/admin/rates`)
        dispatch(setMessage("Успех! Тариф сохранен"))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const resetData = useCallback(() => {
    rateId ? setInitialState(editorData) : resetState()
  }, [editorData, rateId])

  const handleDeleteCategory = useCallback(() => {
    requestDeleteEntity("rate", rateId)
      .then(() => {
        dispatch(setMessage(`Успех! Тариф удален`))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить тариф"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/rates")
  }, [rateId])

  return (
    <Profile
      title="Тариф"
      subTitle={`Профиль тарифа`}
      table="rate"
      id={rateId}
      resetState={resetState}
      handleUpdate={updateRate}
      handleReset={resetData}
      handleDelete={handleDeleteCategory}
    >
      <Input label={"Цена"} value={price} onChange={handleChangePrice} />
      <div className={`${cls.selectWrapper} ${cls.fieldStyle}`}>
        <span>Тариф</span>
        <select
          className={cls.select}
          defaultValue={0}
          onChange={handleChangeRateType}
        >
          <option value={0}>Выберите тариф</option>
          {rateTypes?.map((rate) => (
            <option
              value={rate.id}
              key={rate.id}
              selected={rate.id === rateTypeId}
            >
              {rate.name}
            </option>
          ))}
        </select>
      </div>
    </Profile>
  )
}

export default RateProfile
