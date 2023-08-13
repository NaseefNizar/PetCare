import Footer from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import UserLoginForm from '../../components/User/UserLoginForm'

export const UserLoginPage = () => {
  return (
    <>
    <Navbar />
    <UserLoginForm role='User'/>
    <Footer />
    </>
  )
}
