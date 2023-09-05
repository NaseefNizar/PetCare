import { useEffect } from "react"
import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { UserProfile } from "../../components/User/UserProfile"

export const UserProfilePage = () => {

  const data = localStorage.getItem('user')
  useEffect(() => {
  },[data])
  return (
    <>
    <Navbar />
    
    <UserProfile />

    <Footer />

    </>
  )
}
