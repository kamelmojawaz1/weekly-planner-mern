import React from 'react'
import './Switch.css'

const Switch = ({ isToggled, changeHandler, disabled }) => {
  return (
    <div>
      <label className="switch">
        <input
          checked={isToggled}
          disabled={disabled}
          type="checkbox"
          onChange={changeHandler}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Switch
