import React, { useState } from 'react'
import './Task.css'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import StopIcon from '@material-ui/icons/Stop'
import { useAppContext } from '../../contexts/AppContext/AppContext.js'

const Task = React.forwardRef(({ task }, ref) => {
  const { date, color, completed, highPriority, _id, isToDo } = task
  const [name, setName] = useState(task.name)
  const [mouseInside, setMouseInside] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const { createTask, deleteTask, updateTask } = useAppContext().actions
  const { userId } = useAppContext().state

  const handleMouseEntered = () => {
    setMouseInside(true)
  }

  const handleMouseLeft = () => {
    setMouseInside(false)
  }

  const handleCompleteClicked = e => {
    updateTask({ ...task, completed: !completed })
  }

  const handleHighPriorityClicked = e => {
    updateTask({ ...task, highPriority: !highPriority })
  }

  const handleChooseColorClicked = e => {
    setShowColors(true)
  }

  const handleColorClicked = color => {
    updateTask({ ...task, color: color })
    setShowColors(false)
  }

  const handleDeleteClicked = () => {
    deleteTask(_id)
  }

  const handleNameChanged = e => {
    setName(e.target.value)
  }

  const handleNameUpdated = e => {
    e.target.blur(e)
    if (e.type === 'blur')
      _id === '' ? createNewTask(true) : updateTask({ ...task, name })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleNameUpdated(e)
  }

  const createNewTask = (focusAfterAdding = false) => {
    if (name === '') return
    const newTask = {
      name,
      userId,
      date,
      isToDo,
    }
    createTask(newTask)
    setName('')
    focusAfterAdding && ref.current.focus()
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
