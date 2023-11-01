import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { PaymentSuccess } from '../components/Payment/PaymentSuccess'

export const PaymentSuccessPage  = () => {
  return (
    <>
    <Navbar />
    <PaymentSuccess />
    <Footer />
    </>
  )
}
