import { ChangeEventHandler } from "react"
import { LoupeIcon } from "./Icons"

export function SearchVar(
  {name = "", onChangeFunction = () => {}, placeholder = "", value} : 
  {name?: string, onChangeFunction?: ChangeEventHandler<HTMLInputElement> | undefined, placeholder?: string, value?: string}
) {

  return (
    <div className="searchElement">
      {/* <img src={loupeSvg} alt="search icon" className="icon" /> */}
      <LoupeIcon color="#fff"/>
      <input type="search" name={name} placeholder={placeholder} onChange={onChangeFunction} value={value}/>
    </div>
  )
}