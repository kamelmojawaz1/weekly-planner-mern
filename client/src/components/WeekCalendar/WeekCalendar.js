import React from 'react'
import './WeekCalendar.css'
import { useAppContext } from '../../contexts/AppContext/AppContext'
import moment from 'moment'
import TaskList from '../TaskList/TaskList'
import HabitsList from '../HabitsList/HabitsList'
import Loading from '../Loading/Loading'

const WeekCalendar = () => {
  const { firstDay, tasks, habits, loading } = useAppContext().state
  const days = [[], [], [], [], [], [], [], []]
  tasks.forEach(task => {
    if (task.isToDo) days[7].push(task)
    else {
      const taskDate = moment(new Date(task.date).toLocaleDateString())
      const dayOfWeek = taskDate.diff(firstDay, 'days')
      if (0 <= dayOfWeek && dayOfWeek < 7) days[dayOfWeek].push(task)
    }
  })

  const thisWeekHabits = habits.filter(
    habit => moment(new Date(habit.date)).diff(firstDay, 'days') === 0
  )

  return loading ? (
    <Loading />
  ) : (
    <div className="week-calendar">
      <div className="day1">
        <TaskList startDate={firstDay} dayOfWeek={0} tasks={days[0]} />
      </div>
      <div className="day2">
        <TaskList startDate={firstDay} dayOfWeek={1} tasks={days[1]} />
      </div>
      <div className="day3">
        <TaskList startDate={firstDay} dayOfWeek={2} tasks={days[2]} />
      </div>
      <div className="day4">
        <TaskList startDate={firstDay} dayOfWeek={3} tasks={days[3]} />
      </div>
      <div className="day5">
        <TaskList startDate={firstDay} dayOfWeek={4} tasks={days[4]} />
      </div>
      <div className="day6">
        <TaskList startDate={firstDay} dayOfWeek={5} tasks={days[5]} />
      </div>
      <div className="day7">
        <TaskList startDate={firstDay} dayOfWeek={6} tasks={days[6]} />
      </div>
      <div className="habits">
        <HabitsList habits={thisWeekHabits} />
      </div>
      <div className="todo">
        <TaskList startDate={firstDay} dayOfWeek={7} tasks={days[7]} />
      </div>
    </div>
  )
}

export default WeekCalendar
