import { ChangeEventHandler } from "react"
import loupeSvg from "../../assets/loupeSvg.svg"

export function SearchVar(
  {name = "", onChangeFunction = () => {}, placeholder = ""} : 
  {name?: string, onChangeFunction?: ChangeEventHandler<HTMLInputElement> | undefined, placeholder?: string}
) {

  return (
    <div className="searchElement">
      <img src={loupeSvg} alt="search icon" className="searchIcon" />
      <input type="search" name={name} placeholder={placeholder} onChange={onChangeFunction} />
    </div>
  )
}