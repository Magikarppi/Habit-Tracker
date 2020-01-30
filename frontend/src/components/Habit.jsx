import React from 'react'

const Habit = ({ habit }) => {
  if (!habit) {
    return null
  }

  return (
    <div>
      {habit.name}
    </div>
  )
}

export default Habit