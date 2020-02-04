import React from 'react';
import Chart from 'react-google-charts';

const Habit = ({ habit, handleRemove }) => {
  if (!habit) {
    return null;
  }

  console.log('Habit in Habit:::', habit)
  
  const completionDays = habit.completions.map(dateObj => {
    return [new Date(dateObj.thisYear, dateObj.thisMonth, dateObj.thisDay), 1]
  })

  // const dataThatWorks = [
  //   [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
  //   [new Date(2012, 3, 13), 37032],
  //   [new Date(2012, 3, 14), 38024],
  //   [new Date(2012, 3, 15), 38024],
  //   [new Date(2013, 2, 10), 38447]
  // ]
  
  let data = [
    [
      { type: 'date', id: 'Date' },
      { type: 'number', id: 'Completions'}
    ],
  ]

  data = data.concat(completionDays)

  console.log('completionDays', completionDays)

  return (
    <div>
      <Chart
        width={750}
        height={350}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: habit.name
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <div>
        <button onClick={() => handleRemove(habit)}>Delete</button>
      </div>
    </div>
  );
};

export default Habit