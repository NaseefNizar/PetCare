import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { UserSignUpForm } from "../../components/UserSignUpForm"


export const UserSignUpPage = () => {
  return (
    <>
    <Navbar />
    <UserSignUpForm role='user' />
    <Footer />
    </>
  )
}
