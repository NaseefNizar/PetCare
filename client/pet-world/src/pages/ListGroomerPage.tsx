import React from 'react'
import { Navbar } from '../components/Navbar'
import  ListPartners  from '../components/ListPartners'
import { Box } from '@mui/material'
import ListGroomers from '../components/ListGroomers'

export const ListGroomerPage = () => {
  return (
    <>
    <Navbar />

    <ListGroomers />

    </>
  )
}