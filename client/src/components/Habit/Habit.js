import React, { forwardRef, useState } from 'react'
import { useAlert } from 'react-alert'
import { useAppContext } from '../../contexts/AppContext/AppContext'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import StopIcon from '@material-ui/icons/Stop'
import DeleteIcon from '@material-ui/icons/Delete'
import './Habit.css'

const Habit = React.forwardRef(({ habit }, ref) => {
  const { _id } = habit
  const { createHabit, deleteHabit, updateHabit } = useAppContext().actions
  const { userId, firstDay } = useAppContext().state
  const [mouseInside, setMouseInside] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const [color, setColor] = useState(habit.color)
  const [days, setDays] = useState(habit.days)
  const [name, setName] = useState(habit.name)
  const alert = useAlert()
  let escapeClicked = false

  const handleColorClicked = async newColor => {
    let oldColor = color
    setColor(currentColor => {
      oldColor = currentColor
      return newColor
    })
    setShowColors(false)

    const res = await updateHabit({ ...habit, color: newColor })

    if (res && !res.success) {
      alert.error(res.message)
      setColor(oldColor)
    }
  }

  const handleCompletedClicked = async day => {
    const oldDays = days
    const newDays = days.map((dayProgress, index) =>
      day === index ? !dayProgress : dayProgress
    )
    setDays(newDays)

    const res = await updateHabit({ ...habit, days: newDays })

    if (res && !res.success) {
      alert.error(res.message)
      setDays(oldDays)
    }
  }

  const handleDeleteClicked = async () => {
    const res = await deleteHabit(_id)
    if (res && !res.success) {
      alert.error(res.message)
    }
  }

  const handleNameChanged = e => {
    setName(e.target.value)
  }

  const handleNameUpdated = async () => {
    if (escapeClicked) {
      escapeClicked = false
      return
    }

    if (
      habit.name === name ||
      name === '' ||
      name === null ||
      name === 'undefined'
    ) {
      setName(habit.name)
      return
    }

    const res =
      _id === ''
        ? await createHabit({ name, userId, date: firstDay })
        : await updateHabit({ ...habit, name })

    console.log(res)

    if (res && !res.success) {
      alert.error(res.message)
      setName(habit.name)
    } else if (_id === '') setName('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      escapeClicked = false
      e.target.blur()
    } else if (e.key === 'Escape') {
      escapeClicked = true
      setName(habit.name)
      e.target.blur()
    }
  }

  const displayOptionsClass = mouseInside ? 'd-block' : 'd-none'
  const allDaysCompleted = days.reduce(
    (isAllChecked, dayProgress) => isAllChecked & dayProgress,
    true
  )
  const completedClass = allDaysCompleted ? 'task-completed' : null

  return _id === '' ? (
    <div className="habit">
      <input
        ref={ref}
        className="task-input"
        value={name}
        type="text"
        onBlur={handleNameUpdated}
        onKeyDown={handleKeyDown}
        onChange={handleNameChanged}
      />
    </div>
  ) : (
    <div
      className="habit"
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
    >
      <button
        className={`color-button ${color}`}
        onClick={() => setShowColors(true)}
      >
        <StopIcon />
      </button>
      {showColors ? (
        <div className="colors-div" onMouseLeave={() => setShowColors(false)}>
          <button
            className="color-button red"
            onClick={() => handleColorClicked('red')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button indigo"
            onClick={() => handleColorClicked('indigo')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button teal"
            onClick={() => handleColorClicked('teal')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button lime"
            onClick={() => handleColorClicked('lime')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button purple"
            onClick={() => handleColorClicked('purple')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button black"
            onClick={() => handleColorClicked('black')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button yellow"
            onClick={() => handleColorClicked('yellow')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button lightblue"
            onClick={() => handleColorClicked('lightblue')}
          >
            <StopIcon />
          </button>
          <button
            className="color-button silver"
            onClick={() => handleColorClicked('silver')}
          >
            <StopIcon />
          </button>
        </div>
      ) : null}
      <input
        className={`task-input ${completedClass}`}
        value={name}
        type="text"
        onBlur={handleNameUpdated}
        onKeyDown={handleKeyDown}
        onChange={handleNameChanged}
      />
      <div className="task-options">
        <button className={displayOptionsClass} onClick={handleDeleteClicked}>
          <DeleteIcon />
        </button>
        {days.map((dayCompleted, index) => {
          return (
            <button key={index} onClick={() => handleCompletedClicked(index)}>
              {dayCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </button>
          )
        })}
      </div>
    </div>
  )
})

export default Habit
