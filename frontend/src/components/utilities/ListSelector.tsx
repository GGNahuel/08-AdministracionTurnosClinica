/* import { useEffect, useState } from "react";
import { Entities } from "../../types/Entities";

export function FatherListSelector({elementList, id} : {elementList: Entities[], id: string}) {
  const [selectorList, setSelectorList] = useState<unknown[]>([])

  useEffect(() => {
    setSelectorList(elementList)
  }, [elementList])

  const selectAllSelectors = () => {
    selectorList.forEach(selector => {
      
    })
  }

  return (
    <input type="checkbox" className={`selectorFather id_${id}`} />
  )
}

export function ListSelector({element, fatherSelectorId, id} : {element: Entities, fatherSelectorID: string, id: number}) {

}
 */