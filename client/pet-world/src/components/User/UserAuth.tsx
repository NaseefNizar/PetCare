import { Navigate, Outlet } from "react-router-dom"


export const UserAuth = () => {
  return (
    localStorage.getIem('user') ? <Outlet/> : < Navigate to='/' />
  )
}
