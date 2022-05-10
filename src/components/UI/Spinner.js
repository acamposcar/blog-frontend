import classes from './Spinner.module.css'
import React from 'react'

const Spinner = () => {
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.spinner}></div>
    </div>
  )
}

export default Spinner
