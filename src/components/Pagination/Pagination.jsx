import cls from "./Pagination.module.scss"

const Pagination = ({ pageCount, current, clickHandler }) => {
  const paginationItemClick = (e) => {
    clickHandler(e.target.dataset.page)
  }

  if (pageCount < 2) {
    return null
  }

  return (
    <div className={cls.pagination}>
      {current > 1 && (
        <>
          <span data-page={Number(current) - 1} onClick={paginationItemClick}>
            {"«"}
          </span>
          <span data-page={1} onClick={paginationItemClick}>
            1
          </span>
        </>
      )}
      {current === 4 && (
        <span data-page={current - 2} onClick={paginationItemClick}>
          {current - 2}
        </span>
      )}
      {current > 4 && <span className={cls.ellipsis}>...</span>}
      {current > 2 && (
        <span data-page={current - 1} onClick={paginationItemClick}>
          {current - 1}
        </span>
      )}
      <span className={cls.current}>{current}</span>
      {current < pageCount - 1 && (
        <span data-page={Number(current) + 1} onClick={paginationItemClick}>
          {Number(current) + 1}
        </span>
      )}
      {current === pageCount - 3 && (
        <span data-page={pageCount - 1} onClick={paginationItemClick}>
          {pageCount - 1}
        </span>
      )}
      {current < pageCount - 3 && <span className={cls.ellipsis}>...</span>}
      {current < pageCount && (
        <>
          <span data-page={pageCount} onClick={paginationItemClick}>
            {pageCount}
          </span>
          <span data-page={Number(current) + 1} onClick={paginationItemClick}>
            {"»"}
          </span>
        </>
      )}
    </div>
  )
}

export default Pagination
