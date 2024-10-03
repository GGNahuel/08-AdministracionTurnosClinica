import { MessageInterface } from "../../types/APIResponses";

export default function Message({messageObject} : {messageObject: MessageInterface}) {
  const {text, type} = messageObject

  return (
    <div className={type + " resultMessage"}>
      <h3>{text}</h3>
    </div>
  )
}