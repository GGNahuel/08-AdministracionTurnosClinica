import { MessageInterface } from "../../types/APIResponses";

export default function Message({messageObject} : {messageObject: MessageInterface}) {
  const {text, messageType} = messageObject

  return (
    <div className={messageType + " resultMessage"}>
      <h2>{text}</h2>
    </div>
  )
}