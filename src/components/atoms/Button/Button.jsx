import React from 'react'
import './Button.css'

export default (props) => {
  return (
    <button {...props} className={props.hierarcy}>
      {props.children}
    </button>
  )
}
