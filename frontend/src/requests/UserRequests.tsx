import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/NavigationRoutes";
import { SessionContext, SessionContextInterface } from "../context/SessionContext";
import { getCookie, handleRequest } from "../functions/RequestHandler";
import { HandledResponse, MessageInterface, ReturnResponseType } from "../types/APIResponses";
import { UserRegistration } from "../types/Entities";
import { useSessionSetter } from "../hooks/Security";

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
  const {checkLoggedUser} = useSessionSetter()

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
      if (response.ok) {
        navigateTo("/")
        checkLoggedUser()
      }
      else {
        const data = await response.json()
        console.warn(data)
      }
    }
  }

  return {sendLogInData, errorInterface}
}

export function useLogOut() {
  const {setLoggedUser} = useContext(SessionContext) as SessionContextInterface
  const navigateTo = useNavigate()

  const logout = async () => {
    const request = await fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
      },
      credentials: "include"
    })

    if (request.ok) {
      setLoggedUser(null)
      navigateTo(routes.usuario.login)
    }
    else console.log("Error al cerrar sesión")
  }

  return {logout}
}

/* export function useGetUserByUsername(username: string) {
  const [response, setResponse] = useState<HandledResponse<GetResponseType>>()

  useEffect(() => {
    if (username != "") handleRequest("/user/" + username, "GET", {}).then(response => setResponse(response as HandledResponse<GetResponseType>))
  }, [username])

  return {response}
} */