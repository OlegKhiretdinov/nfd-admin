import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../Input/Input"
import Button from "../Button/Button"
import InputUpload from "../InputUpload/InputUpload"
import ProgressBar from "../ProgressBar/ProgressBar"
import Checkbox from "../Checkbox/Checkbox"
import { getEditorData, setEditorData } from "../../store/editorStore/actions"
import { setCarTypes } from "../../store/carTypesStore/action"
import { requestDeleteEntity, requestEditEntity } from "../../api/request"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./CarProfile.module.scss"
import { setMessage, setMessageType } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"

const CarProfile = () => {
  const dispatch = useDispatch()
  const [{ editorData }, { carTypes }] = useSelector(
    ({ editorStore, carTypesStore }) => [editorStore, carTypesStore]
  )

  const navigate = useNavigate()
  const { carId } = useParams()

  const [isEditable, setIsEditable] = useState(false)

  const [preview, setPreview] = useState()
  const [description, setDescription] = useState()
  const [model, setModel] = useState()
  const [typeCar, setTypeCar] = useState()
  const [number, setNumber] = useState()
  const [tank, setTank] = useState()
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (carId) {
      dispatch(getEditorData("car", carId))
    } else {
      dispatch(setEditorData({}))
      resetState()
    }
  }, [carId])

  useEffect(() => {
    dispatch(setCarTypes("category"))
  }, [])

  const setInitialState = () => {
    setModel(editorData?.name)
    setDescription(editorData.description)
    setNumber(editorData.number)
    setTank(editorData.tank)
    setMinPrice(editorData.priceMin)
    setMaxPrice(editorData.priceMax)
    setColors(editorData.colors || [])
    setTypeCar(editorData.categoryId?.id)
  }

  useEffect(() => {
    setInitialState()
  }, [editorData])

  const resetState = () => {
    setTypeCar(0)
    setDescription("")
    setModel("")
    setMinPrice("")
    setMaxPrice("")
    setColors([])
    setNumber("")
    setTank("")
  }

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value)
  }, [])

  const handleSetColorsClick = useCallback(
    (e) => {
      const newColorField = e.target.closest("div").querySelector("input")
      if (newColorField.value !== "") {
        setColors([...colors, newColorField.value])
        newColorField.value = ""
      }
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

  const handleChangeNumber = useCallback((e) => {
    setNumber(e.target.value)
  }, [])

  const handleChangeTank = useCallback((e) => {
    setTank(e.target.value)
  }, [])

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    await reader.readAsDataURL(file)
    reader.onload = () => {
      setPreview({
        path: reader.result,
        size: file.size,
        originalname: file.name,
        mimetype: file.type,
      })
    }
  }

  const handleSelectColor = (e) => {
    if (!e.target.checked) {
      const newColors = colors.filter((color) => color !== e.target.value)
      setColors(newColors)
    }
  }

  const updateCarInfo = () => {
    const data = {
      priceMax: maxPrice,
      priceMin: minPrice,
      name: model,
      number: number,
      tank: tank,
      thumbnail: preview,
      description: description,
      categoryId: {
        id: typeCar,
      },
      colors,
    }

    const method = carId ? "PUT" : "POST"

    requestEditEntity("car", method, data, carId)
      .then(() => {
        !carId && navigate(`/admin/cars`)
        dispatch(setMessage("Успех! Машина сохранена"))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Данные не сохранились"))
        dispatch(setMessageType(TMessageType.error))
      })
  }

  const handleResetData = () => {
    carId ? setInitialState() : resetState()
  }

  const handleDeleteCar = () => {
    requestDeleteEntity("car", carId)
      .then(() => {
        dispatch(setMessage("Успех! Машина удалена"))
        dispatch(setMessageType(TMessageType.success))
      })
      .catch(() => {
        dispatch(setMessage("Ошибка! Не удалось удалить"))
        dispatch(setMessageType(TMessageType.error))
      })
    navigate("/admin/cars")
  }

  const getTypeName = (id) => {
    const carType = carTypes.find((type) => type.id === id)
    return carType?.name
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
                  ? preview.path
                  : editorData.thumbnail?.path || defaultCar
              }
            />
          </div>
          <div>
            <h3 className={cls.modelName}>{model}</h3>
            <p className={cls.modelType}>{getTypeName(typeCar)}</p>
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
                value={description}
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
              value={model}
              onChange={handleChangeModel}
            />
            <div className={`${cls.selectWrapper} ${cls.fieldStyle}`}>
              <span>Тип автомобиля</span>
              <select
                className={cls.select}
                defaultValue={0}
                onChange={handleChangeTypeCar}
              >
                <option value={0}>Выберите тип</option>
                {carTypes?.map((type) => (
                  <option
                    value={type.id}
                    key={type.id}
                    selected={type.id === typeCar}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label={"Номер"}
              customStyle={cls.fieldStyle}
              value={number}
              onChange={handleChangeNumber}
            />
            <Input
              label={"Топливо"}
              customStyle={cls.fieldStyle}
              value={tank}
              onChange={handleChangeTank}
            />
            <Input
              label={"Минимальная цена"}
              customStyle={cls.fieldStyle}
              value={minPrice}
              onChange={handleChangeMinPrice}
            />
            <Input
              label={"Максимальная цена"}
              customStyle={cls.fieldStyle}
              value={maxPrice}
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
              {colors &&
                colors.map((color) => (
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
            <Button text={"Отменить"} type="light" onClick={handleResetData} />
            <Button
              text={"Удалить"}
              type="reset"
              customStyle={cls.rightButton}
              onClick={handleDeleteCar}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CarProfile
