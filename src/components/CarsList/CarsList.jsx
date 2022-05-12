import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../Button/Button"
import Table from "../Table/Table"
import {
  setCarsFilter,
  setCarsList,
  setCarsListPage,
} from "../../store/carsListStore/actions"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./CarList.module.scss"
import { Link } from "react-router-dom"
import Pagination from "../Pagination/Pagination"
import { setCarTypes } from "../../store/carTypesStore/action"

const CarsList = () => {
  const dispatch = useDispatch()
  const [
    { carsPageCount, carListPage, carsList, carListFilter },
    { carTypes },
  ] = useSelector(({ carsList, carTypesStore }) => [carsList, carTypesStore])

  useEffect(() => {
    dispatch(setCarTypes())
  }, [])

  useEffect(() => {
    dispatch(setCarsList("car", carListPage, carListFilter))
  }, [carListPage, carListFilter])

  const [filterCategory, setFilterCategory] = useState()
  const [sortByPrice, setSortByPrice] = useState()
  const [sortByName, setSortByName] = useState()

  const handleChangeCategory = useCallback((e) => {
    setFilterCategory(e.target.value)
  }, [])

  const handleSortByPrice = useCallback((e) => {
    setSortByPrice(e.target.value)
  }, [])

  const handleSortByName = useCallback((e) => {
    setSortByName(e.target.value)
  }, [])

  const resetFilter = useCallback(() => {
    setFilterCategory("")
    setSortByPrice("")
    setSortByName("")
  }, [])

  const applyFilter = useCallback(() => {
    let filter = ""

    if (filterCategory) {
      filter += `&categoryId[id]=${filterCategory}`
    }

    if (sortByPrice) {
      filter += `&sort`
      if (sortByPrice === "minAsc") {
        filter += "[priceMin]=1"
      }
      if (sortByPrice === "minDsc") {
        filter += "[priceMin]=-1"
      }
      if (sortByPrice === "maxAsc") {
        filter += "[priceMax]=1"
      }
      if (sortByPrice === "maxDsc") {
        filter += "[priceMax]=-1"
      }
    }

    if (sortByName) {
      filter += `&sort`
      if (sortByName === "nameAsc") {
        filter += "[name]=1"
      }
      if (sortByName === "nameDsc") {
        filter += "[name]=-1"
      }
    }

    dispatch(setCarsListPage(0))
    dispatch(setCarsFilter(filter))
  }, [filterCategory, sortByPrice, sortByName])

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
          <div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <select
                className={cls.filterField}
                defaultValue={0}
                onChange={handleChangeCategory}
              >
                <option value={""} key={"default"}>
                  Выбрать категорию
                </option>
                {carTypes?.map((type) => (
                  <option
                    value={type.id}
                    key={type.id}
                    selected={type.id === filterCategory}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <select
                className={cls.filterField}
                defaultValue={""}
                onChange={handleSortByPrice}
              >
                <option key={"default"} value={""}>
                  Сортировка по цене
                </option>
                <option
                  value="minAsc"
                  key="minAsc"
                  selected={sortByPrice === "minAsc"}
                >
                  Мин цена(по возрастанию)
                </option>
                <option
                  value="minDsc"
                  key="minDsc"
                  selected={sortByPrice === "minDsc"}
                >
                  Мин цена(по убыванию)
                </option>
                <option
                  value="maxAsc"
                  key="maxAsc"
                  selected={sortByPrice === "maxAsc"}
                >
                  Макс цена(по возрастанию)
                </option>
                <option
                  value="maxDsc"
                  key="maxDsc"
                  selected={sortByPrice === "maxDsc"}
                >
                  Макс цена(по убыванию)
                </option>
              </select>
            </div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <select
                className={cls.filterField}
                defaultValue={""}
                onChange={handleSortByName}
              >
                <option key={"default"} value={""}>
                  Сортировка по названию
                </option>
                <option
                  value="nameAsc"
                  key="nameAsc"
                  selected={sortByName === "nameAsc"}
                >
                  По названию(А - Я)
                </option>
                <option
                  value="nameDsc"
                  key="nameDsc"
                  selected={sortByName === "nameDsc"}
                >
                  По названию(Я - А)
                </option>
              </select>
            </div>
          </div>
          <div className={cls.buttons}>
            <Button text={"Сбросить"} type="reset" onClick={resetFilter} />
            <Button
              text={"Применить"}
              customStyle={cls.button}
              onClick={applyFilter}
            />
          </div>
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
