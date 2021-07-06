import React, { forwardRef, useState } from 'react'
import { useAlert } from 'react-alert'
import './Task.css'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import StopIcon from '@material-ui/icons/Stop'
import { useAppContext } from '../../contexts/AppContext/AppContext.js'

const Task = forwardRef(({ task }, ref) => {
  const { date, _id, isToDo } = task
  const [name, setName] = useState(task.name)
  const [color, setColor] = useState(task.color)
  const [highPriority, setHighPriority] = useState(task.highPriority)
  const [completed, setCompleted] = useState(task.completed)
  const [mouseInside, setMouseInside] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const { createTask, deleteTask, updateTask } = useAppContext().actions
  const { userId } = useAppContext().state
  const alert = useAlert()
  let escapeClicked = false

  const handleMouseEntered = () => {
    setMouseInside(true)
  }

  const handleMouseLeft = () => {
    setMouseInside(false)
  }

  const handleCompleteClicked = async () => {
    let oldCompleted = completed
    setCompleted(currentCompleted => {
      oldCompleted = currentCompleted
      return !currentCompleted
    })

    const res = await updateTask({ ...task, completed: !completed })

    if (res && !res.success) {
      alert.error(res.message)
      setCompleted(oldCompleted)
    }
  }

  const handleHighPriorityClicked = async () => {
    let oldHighPriority = highPriority
    setHighPriority(currentHighPriority => {
      oldHighPriority = currentHighPriority
      return !currentHighPriority
    })

    const res = await updateTask({ ...task, highPriority: !highPriority })

    if (res && !res.success) {
      alert.error(res.message)
      setHighPriority(oldHighPriority)
    }
  }

  const handleChooseColorClicked = e => {
    setShowColors(true)
  }

  const handleColorClicked = async newColor => {
    let oldColor = color
    setColor(currentColor => {
      oldColor = currentColor
      return newColor
    })
    setShowColors(false)

    const res = await updateTask({ ...task, color: color })

    if (res && !res.success) {
      alert.error(res.message)
      setColor(oldColor)
    }
  }

  const handleDeleteClicked = async () => {
    const res = await deleteTask(_id)
    res && !res.success && alert.error(res.message)
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
      task.name === name ||
      name === '' ||
      name === null ||
      name === 'undefined'
    ) {
      setName(task.name)
      return
    }

    const res =
      _id === ''
        ? await createTask({ name, userId, date, isToDo })
        : await updateTask({ ...task, name })

    if (res && !res.success) {
      alert.error(res.message)
      setName(task.name)
    } else if (_id === '') {
      setName('')
      ref.current.focus()
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      escapeClicked = false
      e.target.blur()
    } else if (e.key === 'Escape') {
      escapeClicked = true
      setName(task.name)
      e.target.blur()
    }
  }

  const highPriorityClass = highPriority
    ? 'high-priority'
    : mouseInside
    ? 'd-block'
    : 'd-none'
  const displayOptionsClass = mouseInside ? 'd-block' : 'd-none'
  const completedClass = completed ? 'task-completed' : null

  return _id === '' ? (
    <div className="task">
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
      className="task"
      onMouseEnter={handleMouseEntered}
      onMouseLeave={handleMouseLeft}
    >
      <button
        className={`color-button ${color}`}
        onClick={handleChooseColorClicked}
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
      ) : (
        <div />
      )}
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
        {completed ? (
          <button
            className={displayOptionsClass}
            onClick={handleCompleteClicked}
          >
            <CheckBoxIcon />
          </button>
        ) : (
          <button
            className={displayOptionsClass}
            onClick={handleCompleteClicked}
          >
            <CheckBoxOutlineBlankIcon />
          </button>
        )}
        <button
          className={highPriorityClass}
          onClick={handleHighPriorityClicked}
        >
          <PriorityHighIcon />
        </button>
      </div>
    </div>
  )
})

export default Task
