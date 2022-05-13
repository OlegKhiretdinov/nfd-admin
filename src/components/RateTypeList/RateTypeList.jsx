import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from "../Table/Table"
import Button from "../Button/Button"
import PageLayout from "../PageLayout/PageLayout"
import Pagination from "../Pagination/Pagination"
import {
  setRateTypes,
  setRateTypesFilter,
  setRateTypesPage,
} from "../../store/rateTypesStore/action"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./RateTypeList.module.scss"

const RateTypeList = () => {
  const dispatch = useDispatch()
  const { rateTypes, rateTypesPage, rateTypesPageCount, rateTypesFilter } =
    useSelector(({ rateTypesStore }) => rateTypesStore)

  useEffect(() => {
    dispatch(setRateTypes(rateTypesPage, rateTypesFilter))
  }, [rateTypesPage, rateTypesFilter])

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

    dispatch(setRateTypesPage(0))
    dispatch(setRateTypesFilter(filter))
  }, [sortByName])

  const paginationClick = (page) => {
    dispatch(setRateTypesPage(page - 1))
  }

  const columnConfig = [
    {
      key: "name",
      columnHeader: "Название",
      contentRender: (item) => (
        <Link to={`/admin/rate-type-profile/${item.id}`}>{item.name}</Link>
      ),
    },
    {
      key: "unit",
      columnHeader: "Единица измерения",
      contentRender: (item) => (item.unit ? item.unit : null),
    },
  ]

  return (
    <PageLayout title={"Типы тарифов"}>
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
        <Table list={rateTypes} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={rateTypesPageCount}
            current={rateTypesPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </>
    </PageLayout>
  )
}

export default RateTypeList
