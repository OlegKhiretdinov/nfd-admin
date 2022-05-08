import PageLayout from "../PageLayout/PageLayout"
import Button from "../Button/Button"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import cls from "./PointList.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getLocalStorageData } from "../../utils/localStorage"
import { setPointsList } from "../../store/PointListStore/actions"
import Table from "../Table/Table"
import { Link } from "react-router-dom"

const PointList = () => {
  const dispatch = useDispatch()

  const { pointsPageCount, pointsList } = useSelector(
    ({ pointsList }) => pointsList
  )

  useEffect(() => {
    dispatch(setPointsList(getLocalStorageData("token"), "point"))
  }, [])

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
          <div className={cls.pagination}>
            <a href="#">{"«"}</a>
            <a href="#">1</a>
            <span>...</span>
            <a href="#">4</a>
            <span className={cls.current}>5</span>
            <a href="#">6</a>
            <span>...</span>
            <a href="#">{pointsPageCount || null}</a>
            <a href="#">{"»"}</a>
          </div>
        </div>
      </>
    </PageLayout>
  )
}

export default PointList
