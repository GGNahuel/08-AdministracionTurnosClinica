import { useContext } from "react";
import { Roles } from "../../types/BackendEnums";
import { SessionContext, SessionContextInterface } from "../../context/SessionContext";
import { Link } from "react-router-dom";
import { RouteValues } from "../../types/NavbarSections";

export function ProtectedLink(props: {path: RouteValues, allowedRoles: Roles[]}) {
  const {path, allowedRoles} = props
  const {loggedUser} = useContext(SessionContext) as SessionContextInterface

  return (
    <>
      {(loggedUser && allowedRoles.includes(loggedUser?.role)) && <Link to={path} />}
    </>
  )
}
