import { FormEvent, useEffect, useState } from "react";
import { HandledResponse, ReturnResponseType } from "../types/APIResponses";
import { UserRegistration } from "../types/Entities";
import { getCookie, handleRequest } from "../functions/RequestHandler";
import { useNavigate } from "react-router-dom";

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
    handleRequest("/user", "POST", {body: userObject}).then(response => setResponse(response as HandledResponse<ReturnResponseType>))
  }, [userObject])

  return {response, handleFormSubmit}
}

export function useLogIn() {
  const navigateTo = useNavigate()

  const sendLogInData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    fetch("/logincheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
      },
      body: new URLSearchParams({
        username: username,
        contrasena: password, // Usa el nombre del parámetro que definiste
      }),
      credentials: "include"
    }).then(response => {
      if (response.ok) navigateTo("/")
      else console.log("loguin error: " + response.body)
    })
  }

  return {sendLogInData}
}