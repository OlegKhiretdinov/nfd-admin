import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../Button/Button"
import Table from "../Table/Table"
import { setCarsList, setCarsListPage } from "../../store/carsListStore/actions"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./CarList.module.scss"
import { Link } from "react-router-dom"
import Pagination from "../Pagination/Pagination"

const CarsList = () => {
  const dispatch = useDispatch()

  const { carsPageCount, carListPage, carsList } = useSelector(
    ({ carsList }) => carsList
  )

  useEffect(() => {
    dispatch(setCarsList("car", carListPage))
  }, [carListPage])

  const paginationClick = (page) => {
    dispatch(setCarsListPage(page - 1))
  }

  const columnConfig = [
    {
      key: "name",
      columnHeader: "Название",
      contentRender: (item) => (
        <Link to={`/admin/car-profile/${item.id}`}>{item.name}</Link>
      ),
    },
    {
      key: "priceMax",
      columnHeader: "Цена макс.",
      contentRender: (item) => item.priceMax,
    },
    {
      key: "priceMin",
      columnHeader: "Цена мин.",
      contentRender: (item) => item.priceMin,
    },
    {
      key: "thumbnail",
      contentRender: (item) => (
        <div className={cls.thumbnail}>
          <img src={item.thumbnail.path || defaultCar} alt={item.name} />
        </div>
      ),
    },
    {
      key: "description",
      columnHeader: "Описание",
      contentRender: (item) => (
        <div className={cls.description}>{item.description}</div>
      ),
    },
    {
      key: "categoryId",
      columnHeader: "Категория",
      contentRender: (item) => item.categoryId?.name,
    },
    {
      key: "colors",
      columnHeader: "Цвет",
      contentRender: (item) =>
        item.colors.map((item) => (
          <>
            <span>{item}</span>
            <br />
          </>
        )),
    },
  ]

  return (
    <>
      <h1 className={cls.title}>Список авто</h1>
      <div className={cls.wrapper}>
        <div className={cls.filters}>
          <form className={cls.form}>
            <div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value="Название" />
              </div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value="Максимальная цена" />
              </div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value=" Минимальная цена" />
              </div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value="Категория" />
              </div>
            </div>
            <div className={cls.buttons}>
              <Button text={"Сбросить"} type="reset" />
              <Button text={"Применить"} customStyle={cls.button} />
            </div>
          </form>
        </div>
        <Table list={carsList} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={carsPageCount}
            current={carListPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </div>
    </>
  )
}

export default CarsList
