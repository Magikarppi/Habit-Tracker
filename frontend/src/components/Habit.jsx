import React from 'react'

const Habit = ({ habit, handleRemove }) => {
  if (!habit) {
    return null
  }

  return (
    <div>
      {habit.name}
      <button onClick={() => handleRemove(habit)}>Delete</button>
    </div>
  )
}

export default Habit