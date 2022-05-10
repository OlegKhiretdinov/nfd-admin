import PageLayout from "../PageLayout/PageLayout"
import Button from "../Button/Button"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./PointList.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getLocalStorageData } from "../../utils/localStorage"
import {
  setPointsList,
  setPointsPage,
} from "../../store/PointListStore/actions"
import Table from "../Table/Table"
import { Link } from "react-router-dom"
import Pagination from "../Pagination/Pagination"

const PointList = () => {
  const dispatch = useDispatch()

  const { pointsPageCount, pointsList, pointsPage } = useSelector(
    ({ pointsList }) => pointsList
  )

  useEffect(() => {
    dispatch(setPointsList(getLocalStorageData("token"), "point", pointsPage))
  }, [pointsPage])

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
          <form className={cls.form}>
            <div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value="Название" />
              </div>
              <div className={cls.fieldWrapper}>
                <SelectSvg className={cls.fieldIcon} />
                <input className={cls.filterField} value="город" />
              </div>
            </div>
            <div className={cls.buttons}>
              <Button text={"Сбросить"} type="reset" />
              <Button text={"Применить"} customStyle={cls.button} />
            </div>
          </form>
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
