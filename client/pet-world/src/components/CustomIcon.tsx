import React from 'react'

type Props = {
    icon:string
}

export const CustomIcon = (props: Props) => {
  return (
    <>
    <img style={{width:'40px', height:'40px'}} src={props.icon} />
    </>
  )
}
