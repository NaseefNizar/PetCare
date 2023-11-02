import { Navigate, Outlet } from "react-router-dom"
// import { useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"


export const UserAuth = () => {
  // const navigate = useNavigate()
  // const isLoggedIn = useAppSelector(state => state.user.loginSuccess)
  const user = localStorage.getItem('user')

  useEffect(() => {

    // !isLoggedIn && navigate('/')
    // !user && navigate('/')
  },[user])
  return (
    localStorage.getItem('user') ? <Outlet/> : < Navigate to='/login' />
    // isLoggedIn ? <Outlet/> : < Navigate to='/' />
  )
}


