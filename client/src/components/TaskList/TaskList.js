import React, { useRef } from 'react'
import './TaskList.css'
import moment from 'moment'
import Task from '../Task/Task'

const TaskList = ({ tasks, startDate, dayOfWeek }) => {
  const newTaskRef = useRef(null)

  const handleEmptySpaceClicked = e => {
    e.target.className === 'task-list' && newTaskRef.current.focus()
  }

  const date = moment(new Date(startDate).toLocaleDateString()).add(
    dayOfWeek,
    'days'
  )
  const today = moment(new Date().toLocaleDateString())
  const todayClass = today.diff(date, 'days') === 0 ? 'today' : null
  const dayName = date.format('dddd')
  const day = date.format('D')
  const month = date.format('M')

  return (
    <div className="day">
      {dayOfWeek === 7 ? (
        <div className="day-header">
          <h4>To Do</h4>
        </div>
      ) : (
        <div className="day-header">
          <h4>
            {month}/{day}
          </h4>
          <h4 className={todayClass}>{dayName}</h4>
        </div>
      )}
      <div className="task-list" onClick={handleEmptySpaceClicked}>
        {tasks.map(task => {
          return <Task key={task._id} task={task} />
        })}
        <Task
          key={startDate}
          ref={newTaskRef}
          task={{
            date: moment(new Date(startDate).toLocaleDateString())
              .add(dayOfWeek, 'days')
              .format('MM/DD/YYYY'),
            name: '',
            _id: '',
            isToDo: dayOfWeek === 7,
          }}
        />
      </div>
    </div>
  )
}

export default TaskList
