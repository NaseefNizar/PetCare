import React, { useEffect, useState } from "react";
import Navbar from "./AdminNavbar";
import SideNav from "./AdminSideNav";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

type RL = {
  children: React.ReactNode;
};

const AdminLayout = (props: RL) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const adminData = useAppSelector(state => state.admin.isLoggedIn)
  useEffect(() => {
    !adminData && navigate('/admin/login')
  },[adminData])

  return (
    <>
      <Navbar setOpen={setOpen} />
      <SideNav open={open} children={props.children} />
    </>
  );
};

export default AdminLayout;
