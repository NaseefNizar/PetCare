import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

export const PartnerAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.vet.loginSuccess);
  const user = localStorage.getItem("partner");


  useEffect(() => {

  },[user])
  return (
    localStorage.getItem('partner') ? <Outlet/> : < Navigate to='/' />
  )
};
