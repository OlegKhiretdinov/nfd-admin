import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from "../Table/Table"
import Button from "../Button/Button"
import PageLayout from "../PageLayout/PageLayout"
import Pagination from "../Pagination/Pagination"
import {
  setPointsFilter,
  setPointsList,
  setPointsPage,
} from "../../store/PointListStore/actions"
import { setCityList } from "../../store/cityListStore/actions"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./PointList.module.scss"

const PointList = () => {
  const dispatch = useDispatch()

  const [
    { pointsPageCount, pointsList, pointsPage, pointsFilter },
    { cityList },
  ] = useSelector(({ pointsList, cityListStore }) => [
    pointsList,
    cityListStore,
  ])

  useEffect(() => {
    dispatch(setCityList())
  }, [])

  useEffect(() => {
    dispatch(setPointsList("point", pointsPage, pointsFilter))
  }, [pointsPage, pointsFilter])

  const [sortByName, setSortByName] = useState()
  const [filterCity, setFilterCity] = useState()

  const handleSortByName = useCallback((e) => {
    setSortByName(e.target.value)
  }, [])

  const handleChangeCity = useCallback((e) => {
    setFilterCity(e.target.value)
  }, [])

  const resetFilter = useCallback(() => {
    setSortByName("")
    setFilterCity("")
  }, [])

  const applyFilter = useCallback(() => {
    let filter = ""

    if (filterCity) {
      filter += `&cityId[id]=${filterCity}`
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

    dispatch(setPointsPage(0))
    dispatch(setPointsFilter(filter))
  }, [sortByName, filterCity])

  const paginationClick = (page) => {
    dispatch(setPointsPage(page - 1))
  }

  const columnConfig = [
    {
      key: "name",
      columnHeader: "Название",
      contentRender: (item) => (
        <Link to={`/admin/point-profile/${item.id}`}>{item.name}</Link>
      ),
    },
    {
      key: "city",
      columnHeader: "Город",
      contentRender: (item) => (item.cityId ? item.cityId.name : null),
    },
    {
      key: "address",
      columnHeader: "Адрес",
      contentRender: (item) => item.address,
    },
  ]

  return (
    <PageLayout title={"Пункты проката"}>
      <>
        <div className={cls.filters}>
          <div>
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
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <select
                className={cls.filterField}
                defaultValue={0}
                onChange={handleChangeCity}
              >
                <option value={""} key={"default"}>
                  Выбрать город
                </option>
                {cityList?.map((city) => (
                  <option
                    value={city.id}
                    key={city.id}
                    selected={city.id === filterCity}
                  >
                    {city.name}
                  </option>
                ))}
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
        <Table list={pointsList} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={pointsPageCount}
            current={pointsPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </>
    </PageLayout>
  )
}

export default PointList
