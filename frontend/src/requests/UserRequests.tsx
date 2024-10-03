import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, handleRequest } from "../functions/RequestHandler";
import { GetResponseType, HandledResponse, MessageInterface, ReturnResponseType } from "../types/APIResponses";
import { UserRegistration } from "../types/Entities";

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
      proffesionalDni: formData.get("proffesionalDNI") as string || "",
      role: isProffesional ? "PROFFESIONAL" : "GENERAL"
    }

    setUserObject(newUserObject)
  }

  useEffect(() => {
    if (userObject) 
      handleRequest("/user", "POST", {body: userObject}).then(response => setResponse(response as HandledResponse<ReturnResponseType>))
  }, [userObject])

  return {response, handleFormSubmit}
}

export function useLogIn() {
  const [errorInterface, setErrorInterface] = useState<MessageInterface>()
  const navigateTo = useNavigate()

  const sendLogInData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const verificationRequest = await handleRequest("/user/" + username, "GET", {})
    if (verificationRequest.status != 200 && verificationRequest.message) {
      const newErrorMessage = verificationRequest.message
      newErrorMessage.text = "El usuario " + username + " no existe. Registrese o corrija el campo"
      setErrorInterface(newErrorMessage)
    } else {
      const response = await fetch("http://localhost:8080/logincheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-XSRF-TOKEN" : getCookie("XSRF-TOKEN")
        },
        body: new URLSearchParams({
          username: username,
          contrasena: password
        }),
        credentials: "include"
      })
      if (response.ok) navigateTo("/")
      else {
        const data = await response.json()
        console.warn(data)
      }
    }
  }

  return {sendLogInData, errorInterface}
}

export function useGetUserByUsername(username: string) {
  const [response, setResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    if (username != "") handleRequest("/user/" + username, "GET", {}).then(response => setResponse(response as HandledResponse<GetResponseType>))
  }, [username])

  return {response}
}