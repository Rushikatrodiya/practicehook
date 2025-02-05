import React from 'react'
import { BtnComponent } from '../../types/type'
// import { BtnComponent } from '../types/type'

const Button: React.FC<BtnComponent> = ({children, action}) => {
  return (
    <button onClick ={action}>{children}</button>
  )
}

export default Button