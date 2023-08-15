import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"


export const UserAuth = () => {
  const isLoggedIn = useAppSelector(state => state.user.loginSuccess)
  return (
    // localStorage.getIem('user') ? <Outlet/> : < Navigate to='/' />
    isLoggedIn ? <Outlet/> : < Navigate to='/' />
  )
}
