import { MessageInterface } from "../../types/APIResponses";

export default function Message({messageObject} : {messageObject: MessageInterface}) {
  const {text, messageType} = messageObject

  return (
    <div className={messageType + " resultMessage"}>
      <h3>{text}</h3>
    </div>
  )
}