import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Input from "../Input/Input"
import Button from "../Button/Button"
import InputUpload from "../InputUpload/InputUpload"
import ProgressBar from "../ProgressBar/ProgressBar"
import Checkbox from "../Checkbox/Checkbox"
import { getEditorData, setEditorData } from "../../store/editorStore/actions"
import { setCarTypes } from "../../store/carTypesStore/action"
import { getLocalStorageData } from "../../utils/localStorage"
import { requestEditEntity } from "../../api/request"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./CarProfile.module.scss"

const CarProfile = () => {
  const dispatch = useDispatch()
  const [{ editorData }, { carTypes }] = useSelector(
    ({ editorStore, carTypesStore }) => [editorStore, carTypesStore]
  )
  const { carId } = useParams()
  const token = getLocalStorageData("token")

  const [isEditable, setIsEditable] = useState(false)

  const [preview, setPreview] = useState()
  const [description, setDescription] = useState("")
  const [model, setModel] = useState("")
  const [typeCar, setTypeCar] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (carId) {
      dispatch(getEditorData(token, "car", carId))
    } else {
      dispatch(setEditorData({}))
    }
  }, [carId])

  useEffect(() => {
    carTypes.length === 0 && dispatch(setCarTypes(token, "category"))
  }, [])

  if (!colors.length && editorData.colors?.length) {
    setColors(editorData.colors)
  }

  if (!typeCar && editorData.categoryId?.id) {
    setTypeCar(editorData.categoryId?.id)
  }

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value)
  }, [])

  const handleSetColorsClick = useCallback(
    (e) => {
      const newColorField = e.target.closest("div").querySelector("input")
      setColors([...colors, newColorField.value])
      newColorField.value = ""
    },
    [colors]
  )

  const handleChangeTypeCar = useCallback((e) => {
    setTypeCar(e.target.value)
  }, [])

  const handleChangeModel = useCallback((e) => {
    setModel(e.target.value)
  }, [])

  const handleChangeMinPrice = useCallback((e) => {
    setMinPrice(e.target.value)
  }, [])

  const handleChangeMaxPrice = useCallback((e) => {
    setMaxPrice(e.target.value)
  }, [])

  const handleUpload = (e) => {
    setPreview(e.target.files[0])
  }

  const handleSelectColor = (e) => {
    if (!e.target.checked) {
      const newColors = colors.filter((color) => color !== e.target.value)
      setColors(newColors)
    }
  }

  const updateCarInfo = () => {
    const thumbnail = {
      size: preview.size,
      originalname: preview.name,
      mimetype: preview.type,
      path: preview.webkitRelativePath,
    }
    const data = {
      priceMax: minPrice || editorData.priceMin,
      priceMin: maxPrice || editorData.priceMax,
      name: model || editorData.name,
      thumbnail,
      description: description || editorData.description,
      categoryId: {
        id: typeCar,
      },
      colors,
    }

    const method = carId ? "PUT" : "POST"
    requestEditEntity(token, "car", method, data, carId)
  }

  return (
    <>
      <h1 className={cls.title}>Карточка автомобиля</h1>
      <div className={cls.wrapper}>
        <div className={cls.description}>
          <div className={cls.preview}>
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : editorData.thumbnail?.path || defaultCar
              }
            />
          </div>
          <div>
            <h3 className={cls.modelName}>{editorData.name || model}</h3>
            <p className={cls.modelType}>
              {editorData.categoryId?.name || typeCar}
            </p>
          </div>
          <div className={cls.uploadField}>
            <InputUpload fileName={preview?.name} onChange={handleUpload} />
          </div>
          <div className={cls.progressBar}>
            <ProgressBar text={"Заполнено"} percent={74} />
          </div>
          <div className={cls.text}>
            <h4 className={cls.subTitle}>Описание</h4>
            {isEditable ? (
              <textarea
                autoFocus={true}
                value={description || editorData.description}
                onChange={handleChangeDescription}
                className={cls.textEditMode}
                placeholder="Введите описание"
                rows={5}
                onBlur={() => {
                  setIsEditable(false)
                }}
              />
            ) : (
              <div
                onClick={() => {
                  setIsEditable(true)
                }}
                className={cls.textReadMode}
              >
                {description || editorData.description || "Введите описание"}
              </div>
            )}
          </div>
        </div>
        <div className={cls.options}>
          <div className={cls.header}>
            <h2>Настройки автомобиля</h2>
          </div>
          <div className={cls.main}>
            <Input
              label={"Модель автомобиля"}
              customStyle={cls.fieldStyle}
              value={model || editorData.name}
              onChange={handleChangeModel}
            />
            <div className={`${cls.selectWrapper} ${cls.fieldStyle}`}>
              <span>Тип автомобиля</span>
              <select
                className={cls.select}
                placeholder="Выберите тип"
                onChange={handleChangeTypeCar}
              >
                {carTypes?.map((type) => {
                  const currentTypeId = typeCar.id || editorData.categoryId?.id
                  return (
                    <option
                      value={type.id}
                      key={type.id}
                      selected={type.id === currentTypeId}
                    >
                      {type.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <Input
              label={"Минимальная цена"}
              customStyle={cls.fieldStyle}
              value={minPrice || editorData.priceMin}
              onChange={handleChangeMinPrice}
            />
            <Input
              label={"Максимальная цена"}
              customStyle={cls.fieldStyle}
              value={maxPrice || editorData.priceMax}
              onChange={handleChangeMaxPrice}
            />
            <div className={cls.colors}>
              <div className={cls.colorsField}>
                <Input
                  label={"Доступные цвета"}
                  customStyle={cls.colorsFieldInput}
                  placeholder="Добавить цвет"
                />
                <button
                  className={cls.plusButton}
                  onClick={handleSetColorsClick}
                >
                  <span>+</span>
                </button>
              </div>
              {colors.map((color) => (
                <div key={color}>
                  <Checkbox
                    checked={true}
                    id={color}
                    label={color}
                    onChange={handleSelectColor}
                    value={color}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={cls.footer}>
            <Button
              text={"Сохранить"}
              customStyle={cls.button}
              onClick={updateCarInfo}
            />
            <Button text={"Отменить"} type="light" />
            <Button
              text={"Удалить"}
              type="reset"
              customStyle={cls.rightButton}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CarProfile
