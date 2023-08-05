import React, {useState} from 'react'
import Navbar from './AdminNavbar'
import SideNav from './AdminSideNav'
import { useAppSelector } from '../../redux/hooks'


type RL = {
    children: React.ReactNode
}

const AdminLayout = ( props:RL ) => {
    const val = useAppSelector(state => state)
 const [open, setOpen] = useState(false);
 console.log(val);
 
 return (
 <>
  <Navbar setOpen={setOpen} />
  <SideNav open={open} children={props.children} />
 </>
 )
}

export default AdminLayout