import { selectNamingAttributeFromEntity } from "../../functions/Utilities"
import { useSelectedCheckboxesObject } from "../../hooks/SelectChecboxes"
import { Entities } from "../../types/Entities"
import { FatherCheckboxes } from "../../types/Others"

export function SelectItemCheckbox (
  {selectedCheckboxesObject, fatherOrChild, fatherName, childElements, child} :
  {selectedCheckboxesObject: ReturnType<typeof useSelectedCheckboxesObject>, fatherOrChild: "father" | "child", 
    fatherName: FatherCheckboxes, childElements?: Entities[], child?: Entities}
) {
  const {selectedCheckboxes, setSeletedCheckboxes} = selectedCheckboxesObject

  const fatherInput = () => {
    if (!childElements) return <p>Error</p>

    return (
      <input 
        type="checkbox" 
        checked={setCheckedSelectorFather()} 
        onChange={(ev)=> selectorFatherOnChange(ev, childElements)}
        title="Seleccionar todas las filas"
      />
    )
  }

  const selectorFatherOnChange = (ev: React.ChangeEvent<HTMLInputElement>, childs: Entities[]) => {
    const { checked } = ev.target
    const updateSelectedcheckboxes: Record<FatherCheckboxes, Record<string, boolean>> = {... selectedCheckboxes}

    updateSelectedcheckboxes[fatherName] = {}
    childs.forEach(entity => {
      const keyNameFromEntity = selectNamingAttributeFromEntity(entity)
      updateSelectedcheckboxes[fatherName][keyNameFromEntity] = checked
    })

    setSeletedCheckboxes(updateSelectedcheckboxes)
  }
 
  const childInput = () => {
    if (!child) return <p>Error</p>
    const childKeyName = selectNamingAttributeFromEntity(child)

    return (
      <label>
        <input 
        type="checkbox" 
        checked={selectedCheckboxes[fatherName][childKeyName] || false}
        onChange={(ev) => selectorChildOnChange(ev, child)}
        title="Seleccionar fila"
        />
      </label>
    )
  }

  const selectorChildOnChange = (ev: React.ChangeEvent<HTMLInputElement>, childEntity: Entities) => {
    const {checked} = ev.target
    const keyNameFromEntity = selectNamingAttributeFromEntity(childEntity)

    setSeletedCheckboxes(prev => ({
      ...prev,
      [fatherName]: {
        ...prev[fatherName],
        [keyNameFromEntity]: checked
      }
    }))
  }

  const setCheckedSelectorFather = () => {
    // inicializa el selectedCheckboxes según las entidades de la tabla
    childElements?.forEach(entity => {
      const keyNameFromEntity = selectNamingAttributeFromEntity(entity)
      if (!selectedCheckboxes[fatherName][keyNameFromEntity]) {
        selectedCheckboxes[fatherName][keyNameFromEntity] = false
      }
    })

    const childCheckboxesValues = Object.values(selectedCheckboxes[fatherName])
    if (childCheckboxesValues.length == 0) return false

    if (childCheckboxesValues.every(value => value)) return true
    else return false
  }
  
  return (
    <>
      {fatherOrChild == "father" ?
        fatherInput() : fatherOrChild == "child" &&
        childInput()
      }
    </>
  )
}
