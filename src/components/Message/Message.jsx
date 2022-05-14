import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"
import { setMessage } from "../../store/messageStore/actions"
import { TMessageType } from "../../utils/const"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import { ReactComponent as SuccessIcon } from "../../assets/icons/success.svg"
import cls from "./Message.module.scss"

const Message = () => {
  const dispatch = useDispatch()
  const { message, messageType } = useSelector(
    ({ messageStore }) => messageStore
  )
  const messageClass = classNames(cls.wrapper, {
    [cls.success]: messageType === TMessageType.success,
    [cls.error]: messageType === TMessageType.error,
  })

  const handleCloseClick = () => {
    dispatch(setMessage(""))
  }

  return (
    message && (
      <div className={messageClass}>
        <SuccessIcon />
        <p className={cls.text}>{message}</p>
        <div className={cls.iconWrapper}>
          <CloseIcon className={cls.icon} onClick={handleCloseClick} />
        </div>
      </div>
    )
  )
}

export default Message
