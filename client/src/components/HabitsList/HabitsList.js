import React, { useRef } from 'react'
import Habit from '../Habit/Habit'
import './HabitsList.css'

const HabitsList = ({ habits }) => {
  const newHabitRef = useRef(null)
  const handleEmptySpaceClicked = e => {
    e.target.className === 'habits-list' && newHabitRef.current.focus()
  }
  return (
    <div className="habits-div">
      {
        <div className="habits-header">
          <h4>Habit Tracker</h4>
          <div className="habits-days">
            <button>Mo</button>
            <button>Tu</button>
            <button>We</button>
            <button>Th</button>
            <button>Fr</button>
            <button>Sa</button>
            <button>Su</button>
          </div>
        </div>
      }
      <div className="habits-list" onClick={handleEmptySpaceClicked}>
        {habits.map(habit => {
          return <Habit key={habit._id} habit={habit} />
        })}
        <Habit ref={newHabitRef} habit={{ days: [], _id: '', name: '' }} />
      </div>
    </div>
  )
}

export default HabitsList
