import { useCallback, useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import InputUpload from "../InputUpload/InputUpload"
import ProgressBar from "../ProgressBar/ProgressBar"
import Checkbox from "../Checkbox/Checkbox"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./CarProfile.module.scss"

const CarProfile = () => {
  const [isEditable, setIsEditable] = useState(false)

  const [preview, setPreview] = useState()
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  )
  const [model, setModel] = useState("Hyndai, i30 N")
  const [typeCar, setTypeCar] = useState("Компакт-кар")
  const [colors, setColors] = useState(["красный", "белый", "чёрный"])

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

  const handleUpload = (e) => {
    setPreview(e.target.files[0])
  }

  return (
    <>
      <h1 className={cls.title}>Карточка автомобиля</h1>
      <div className={cls.wrapper}>
        <div className={cls.description}>
          <div className={cls.preview}>
            <img src={preview ? URL.createObjectURL(preview) : defaultCar} />
          </div>
          <div>
            <h3 className={cls.modelName}>{model || "Модель"}</h3>
            <p className={cls.modelType}>{typeCar || "Тип автомобиля"}</p>
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
                onChange={(e) => setDescription(e.target.value)}
                className={cls.editor}
                placeholder="Введите описание"
                onBlur={() => {
                  setIsEditable(false)
                }}
              />
            ) : (
              <div
                onClick={() => {
                  setIsEditable(true)
                }}
                className={cls.textArea}
              >
                {description || "Введите описание"}
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
            <Input
              label={"Тип автомобиля"}
              customStyle={cls.fieldStyle}
              value={typeCar}
              onChange={handleChangeTypeCar}
              error={"Пример ошибки"}
            />
            <div className={cls.colors}>
              <div className={cls.colorsField}>
                <Input
                  label={"Доступные цвета"}
                  customStyle={cls.colorsFieldInput}
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
                  <Checkbox checked={true} id={color} label={color} />
                </div>
              ))}
            </div>
          </div>
          <div className={cls.footer}>
            <Button text={"Сохранить"} customStyle={cls.button} />
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
