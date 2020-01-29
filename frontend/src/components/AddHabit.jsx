import React from 'react';

const AddHabit = ({ handleHabitSubmit, habitName }) => {
  return (
    <div>
      <form onSubmit={handleHabitSubmit}>
        name: <input {...habitName} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddHabit;
