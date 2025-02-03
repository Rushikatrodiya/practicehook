import React from 'react'

const Button = ({btntext ,handlebutton}) => {
  return (
    <>
      <button onClick={handlebutton} style={{color: "lightcoral"}}> {btntext} </button>
    </>
  )
}

export default Button