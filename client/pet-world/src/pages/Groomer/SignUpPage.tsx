import Footer from "../../components/Footer"
import { Navbar } from "../../components/Navbar"
import { UserSignUpForm } from "../../components/UserSignUpForm"


type Props = {role:'Vet' | 'Groomer'}
export const SignUpPage = (props:Props) => {
  return (
    <>
    <Navbar />
    <UserSignUpForm role={"Groomer"}/>
    <Footer />
    </>
  )
}