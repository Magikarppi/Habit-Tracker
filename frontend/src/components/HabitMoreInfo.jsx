import React from 'react';
import Chart from 'react-google-charts';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  withRouter,
  useHistory
} from 'react-router-dom';

const HabitMoreInfo = ({ habit, handleRemove }) => {
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

  const options = {
    title: habit.name,
    noDataPattern: {
      backgroundColor: '#000000',
      color: '#000000'
    },
    colorAxis: {
      minValue: 0,
      colors: ['#00e5ff', '#73ff00']
    },
    calendar: {
      cellSize: 25,
      cellColor: {
        stroke: '#e3e3e3',
        strokeOpacity: 0.5,
        strokeWidth: 1
      },
      focusedCellColor: {
        stroke: '#d3362d', // white
        strokeOpacity: 1,
        strokeWidth: 1,
      },
      monthLabel: {
        fontName: 'Arial',
        fontSize: 12,
        color: '#d3362d', // burgundy red
        bold: true,
        italic: true
      },
      monthOutlineColor: {
        stroke: '#fad850', // gold
        strokeOpacity: 0.8,
        strokeWidth: 3
      },
      unusedMonthOutlineColor: {
        stroke: '#bc5679', // reddish
        strokeOpacity: 0.8,
        strokeWidth: 2
      },
      underMonthSpace: 16,
      underYearSpace: 10,
      yearLabel: {
        fontName: 'Arial',
        fontSize: 32,
        color: '#695508', // mustard
        bold: true
      },
     },

  }

  data = data.concat(completionDays)

  console.log('completionDays', completionDays)

  return (
    <div>
    <Link to="/">My habits</Link>
      <Chart
        width={750}
        height={350}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ 'data-testid': '1' }}
      />
      <div>
        <button onClick={() => handleRemove(habit)}>Delete</button>
      </div>
    </div>
  );
};

export default HabitMoreInfo