import React, { useEffect, useState } from "react";
import Navbar from "./PartnerHeader";
import SideNav from "./PartnerSidebar";
import { useAppSelector } from "../../redux/hooks";
import { Outlet, useNavigate } from "react-router-dom";

type RL = {
  children: React.ReactNode;
};

const PartnerLayout = (
  // props: RL
  ) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const partnerState = useAppSelector(state => state.vet)
  const partnerData = partnerState.userData

  // const token = useAppSelector(state => state.vet.tokenStat)
  // const blocked = useAppSelector(state => state.vet.blockStat)
  const partner = localStorage.getItem('partner')
  // const partner = useAppSelector(state => state.vet.userData)
  useEffect(() => {
    !partner && navigate('/login')
  },[partner])
  useEffect(() => {
    partnerState.tokenStat === false && navigate('/login')
  },[partnerState])
  useEffect(() => {
    partnerState.blockStat && navigate('/login')
  },[partnerState])

  return (
    <>
      <Navbar setOpen={setOpen} />
      <SideNav open={open} 
      // children={props.children} 
      />
      < Outlet />
    </>
  );
};

export default PartnerLayout;
