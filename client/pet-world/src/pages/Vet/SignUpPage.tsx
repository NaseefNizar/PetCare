import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { UserSignUpForm } from "../../components/UserSignUpForm"


type Props = {role:'vet' | 'groomer'}
export const SignUpPage = (props:Props) => {
  return (
    <>
    <Navbar />
    <UserSignUpForm role={"vet"}/>
    <Footer />
    </>
  )
}