import classNames from "classnames"
import cls from "./Table.module.scss"

const Table = (props) => {
  const { columnConfig, list } = props

  const tableHeader = columnConfig.map((item, index) => (
    <th className={cls.th} key={index}>
      {item.columnHeader}
    </th>
  ))

  const rowRender = (rowContent) => (
    <tr className={cls.row} key={rowContent.id}>
      {columnConfig.map((item, index) => {
        const classes = classNames(cls.cell, { [cls.firstColumn]: index === 0 })
        return (
          <td className={classes} key={item.key}>
            {item.contentRender(rowContent)}
          </td>
        )
      })}
    </tr>
  )

  const tableBody = list?.map((item) => rowRender(item))

  return (
    <table className={cls.table}>
      <tr>{tableHeader}</tr>
      {tableBody}
    </table>
  )
}

export default Table
