import { useAppSelector } from "../../redux/hooks"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export const AdminAuth = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    console.log(isLoggedIn);
    
  return isLoggedIn ? <Outlet /> : <Navigate to='/admin/login' replace />
  
}
