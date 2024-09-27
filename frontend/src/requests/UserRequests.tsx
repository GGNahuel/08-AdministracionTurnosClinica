import { FormEvent, useEffect, useState } from "react";
import { HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { UserRegistration } from "../types/Entities";
import { handleRequest } from "../functions/RequestHandler";

export function useRegisterUser() {
  const [response, setResponse] = useState<HandledResponse<ReturnResponseType>>()
  const [userObject, setUserObject] = useState<UserRegistration>()

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>, isProffesional: boolean) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUserObject: UserRegistration = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      password2: formData.get("password2") as string,
      email: formData.get("email") as string,
      isProffesional,
      proffesionalDni: formData.get("proffesionalDni") as string || "",
      role: isProffesional ? "PROFFESIONAL" : "GENERAL"
    }

    setUserObject(newUserObject)
  }

  useEffect(() => {
    handleRequest("/api/user", "POST", userObject).then(response => setResponse(response as HandledResponse<ReturnResponseType>))
  }, [userObject])

  return {response, handleFormSubmit}
}