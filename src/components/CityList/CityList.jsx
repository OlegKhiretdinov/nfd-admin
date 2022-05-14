import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from "../Table/Table"
import Button from "../Button/Button"
import PageLayout from "../PageLayout/PageLayout"
import Pagination from "../Pagination/Pagination"
import {
  setCityList,
  setCityListFilter,
  setCityListPage,
} from "../../store/cityListStore/actions"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./CityList.module.scss"

const CityList = () => {
  const dispatch = useDispatch()
  const { cityList, cityListPage, cityListPageCount, cityListFilter } =
    useSelector(({ cityListStore }) => cityListStore)

  useEffect(() => {
    dispatch(setCityList(cityListPage, cityListFilter))
  }, [cityListPage, cityListFilter])

  const [sortByName, setSortByName] = useState()

  const handleSortByName = useCallback((e) => {
    setSortByName(e.target.value)
  }, [])

  const resetFilter = useCallback(() => {
    setSortByName("")
  }, [])

  const applyFilter = useCallback(() => {
    let filter = ""

    if (sortByName) {
      filter += `&sort`
      if (sortByName === "nameAsc") {
        filter += "[name]=1"
      }
      if (sortByName === "nameDsc") {
        filter += "[name]=-1"
      }
    }

    dispatch(setCityListPage(0))
    dispatch(setCityListFilter(filter))
  }, [sortByName])

  const paginationClick = (page) => {
    dispatch(setCityListPage(page - 1))
  }

  const columnConfig = [
    {
      key: "name",
      columnHeader: "Название",
      contentRender: (item) => (
        <Link to={`/admin/city-profile/${item.id}`}>{item.name}</Link>
      ),
    },
  ]
  return (
    <PageLayout title={"Города"}>
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
        <Table list={cityList} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={cityListPageCount}
            current={cityListPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </>
    </PageLayout>
  )
}

export default CityList
