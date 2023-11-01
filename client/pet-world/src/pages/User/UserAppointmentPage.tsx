import { useEffect } from "react"
import { Appointments } from "../../components/User/Appointments"

export const UserAppointmentPage = () => {

  const data = localStorage.getItem('user')
  useEffect(() => {
  },[data])
  return (
    <>
    <Appointments />
    </>
  )
}