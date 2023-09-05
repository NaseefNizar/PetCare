import React, { useEffect, useState } from "react";
import Navbar from "./PartnerHeader";
import SideNav from "./PartnerSidebar";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

type RL = {
  children: React.ReactNode;
};

const PartnerLayout = (props: RL) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const token = useAppSelector(state => state.vet.tokenStat)
  const blocked = useAppSelector(state => state.vet.blockStat)
  const partner = localStorage.getItem('partner')
  useEffect(() => {
    !partner && navigate('/login')
  },[partner])
  useEffect(() => {
    token === false && navigate('/login')
  },[token])
  useEffect(() => {
    blocked && navigate('/login')
  },[blocked])

  return (
    <>
      <Navbar setOpen={setOpen} />
      <SideNav open={open} children={props.children} />
    </>
  );
};

export default PartnerLayout;
