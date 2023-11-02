import { Navbar } from '../../components/Navbar'
import StripeContainer from '../../components/Payment/StripeContainer'
// import Footer from '../../components/Footer'

export const PaymentPage = () => {
  return (
    <div>
        <Navbar />
        <StripeContainer />
        {/* <Footer /> */}
    </div>
  )
}
