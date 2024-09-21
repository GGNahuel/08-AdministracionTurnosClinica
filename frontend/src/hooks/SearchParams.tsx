import { useSearchParams } from "react-router-dom"
import { SearchTypes } from "../types/SearchFormTypes"

export function useSearchParamsURL() {
  const [urlParams, setParamsUrl] = useSearchParams()
  
  const handleSearchFormInputChange = <searchType extends SearchTypes>(ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, paramName: keyof searchType, alternativeValue?: string) => {
    const value = ev.currentTarget.value
    if (value && value != "") {
      urlParams.set(paramName as string, alternativeValue || value)
    } else {
      urlParams.delete(paramName as string)
    }
    setParamsUrl(urlParams)
  }

  return {urlParams, handleSearchFormInputChange}
}