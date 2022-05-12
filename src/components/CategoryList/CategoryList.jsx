import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from "../Table/Table"
import Button from "../Button/Button"
import PageLayout from "../PageLayout/PageLayout"
import Pagination from "../Pagination/Pagination"
import {
  setCarTypes,
  setCarTypesFilter,
  setCarTypesPage,
} from "../../store/carTypesStore/action"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./CategoryList.module.scss"

const CategoryList = () => {
  const dispatch = useDispatch()
  const { carTypes, carTypesPage, carTypesCount, carTypesFilter } = useSelector(
    ({ carTypesStore }) => carTypesStore
  )

  useEffect(() => {
    dispatch(setCarTypes(carTypesPage, carTypesFilter))
  }, [carTypesFilter, carTypesPage])

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

    dispatch(setCarTypesPage(0))
    dispatch(setCarTypesFilter(filter))
  }, [sortByName])

  const paginationClick = (page) => {
    dispatch(setCarTypesPage(page - 1))
  }

  const columnConfig = [
    {
      key: "name",
      columnHeader: "Название",
      contentRender: (item) => (
        <Link to={`/admin/category-profile/${item.id}`}>{item.name}</Link>
      ),
    },
    {
      key: "description",
      columnHeader: "Описание",
      contentRender: (item) => (item.description ? item.description : null),
    },
  ]

  return (
    <PageLayout title="Категории">
      <>
        <div className={cls.filters}>
          <form className={cls.form}>
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
          </form>
        </div>
        <Table list={carTypes} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={carTypesCount}
            current={carTypesPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </>
    </PageLayout>
  )
}

export default CategoryList
