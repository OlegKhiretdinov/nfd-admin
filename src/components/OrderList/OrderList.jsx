import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Table from "../Table/Table"
import Button from "../Button/Button"
import Checkbox from "../Checkbox/Checkbox"
import {
  setOrdersList,
  setOrdersPage,
} from "../../store/ordersListStore/actions"
import { ReactComponent as SelectSvg } from "../../assets/icons/select.svg"
import { ReactComponent as EnableSvg } from "../../assets/icons/enable.svg"
import { ReactComponent as ChangeSvg } from "../../assets/icons/change.svg"
import { ReactComponent as CancelSvg } from "../../assets/icons/cancel.svg"
import defaultCar from "../../assets/img/default_car.png"
import cls from "./OrderList.module.scss"
import { dateFormat } from "../../utils/const"
import Pagination from "../Pagination/Pagination"

const OrderList = () => {
  const dispatch = useDispatch()

  const { orderPageCount, ordersList, ordersPage } = useSelector(
    ({ ordersList }) => ordersList
  )

  useEffect(() => {
    dispatch(setOrdersList("order", ordersPage))
  }, [ordersPage])

  const paginationClick = (page) => {
    dispatch(setOrdersPage(page - 1))
  }

  const columnConfig = [
    {
      key: "thumbnail",
      contentRender: (item) => (
        <div className={cls.thumbnail}>
          <img src={item.carId?.thumbnail.path || defaultCar} alt={item.name} />
        </div>
      ),
    },
    {
      key: "description",
      contentRender: (item) => {
        const name = item.carId?.name ? (
          <span className={cls.dark}>{item.carId?.name}</span>
        ) : (
          ""
        )
        const city = item.cityId?.name ? (
          <span className={cls.dark}>{item.cityId?.name}</span>
        ) : (
          ""
        )
        const point = item.pointId?.address || ""
        const dateFrom = new Date(item.dateFrom).toLocaleDateString(
          "ru",
          dateFormat
        )
        const dateTo = new Date(item.dateTo).toLocaleDateString(
          "ru",
          dateFormat
        )
        const color = item.color ? (
          <span className={cls.dark}>{item.color}</span>
        ) : (
          ""
        )
        return (
          <>
            <div>
              {name}
              {name && city && " в "} {city}
              {` ${point}`}
            </div>
            <div>
              {dateFrom} - {dateTo}
            </div>
            <div>
              {`Цвет `}
              {color}
            </div>
          </>
        )
      },
    },
    {
      key: "options",
      contentRender: (item) => (
        <div className={cls.options}>
          <div>
            <Checkbox
              id={`fullTank_${item.id}`}
              label={"Полный бак"}
              checked={!!item?.isFullTank}
            />
          </div>
          <div>
            <Checkbox
              id={`childChair_${item.id}`}
              label={"Детское кресло"}
              checked={!!item?.isNeedChildChair}
            />
          </div>
          <div>
            <Checkbox
              id={`rightWheel_${item.id}`}
              label={"Правый руль"}
              checked={!!item?.isRightWheel}
            />
          </div>
        </div>
      ),
    },
    {
      key: "price",
      contentRender: (item) =>
        item.price && <span className={cls.price}>{item.price}&nbsp;₽</span>,
    },
    {
      key: "actions",
      contentRender: () => (
        <div className={cls.actions}>
          <button>
            <EnableSvg />
            <span>Готово</span>
          </button>
          <button>
            <CancelSvg />
            <span>Отмена</span>
          </button>
          <button>
            <ChangeSvg />
            <span>Изменить</span>
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <h1 className={cls.title}>Заказы</h1>
      <div className={cls.wrapper}>
        <div className={cls.filters}>
          <div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <input className={cls.filterField} value="За неделю" />
            </div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <input className={cls.filterField} value="Elantra" />
            </div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <input className={cls.filterField} value=" Ульяновск" />
            </div>
            <div className={cls.fieldWrapper}>
              <SelectSvg className={cls.fieldIcon} />
              <input className={cls.filterField} value=" В процессе" />
            </div>
          </div>
          <Button text={"Применить"} customStyle={cls.button} />
        </div>
        <Table list={ordersList} columnConfig={columnConfig} />
        <div className={cls.footer}>
          <Pagination
            pageCount={orderPageCount}
            current={ordersPage + 1}
            clickHandler={paginationClick}
          />
        </div>
      </div>
    </>
  )
}

export default OrderList
