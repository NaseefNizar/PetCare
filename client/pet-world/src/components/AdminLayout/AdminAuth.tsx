import { useAppSelector } from "../../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AdminAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.admin.isLoggedIn);
  const tokenError = useAppSelector((state) => state.admin.error);
  const error = tokenError !== "No token found"
  return isLoggedIn && error ? <Outlet /> : <Navigate to="/admin/login" replace />;
  // return <Outlet />
};
