import { useAppSelector } from "../../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AdminAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.admin.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
