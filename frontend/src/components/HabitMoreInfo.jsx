import React from 'react';
import Chart from 'react-google-charts';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';

const DeleteBtn = styled.button`
  background: #cfccc2;
  &:hover {
    background: #ff711f;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`;

const MyHabitsDiv = styled.div`
  background: rgba(255, 255, 220, 0.8);
  &:hover {
    background: #e3bf20;
  }
  text-align: center;
  color: #121200;
  width: 50px;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
`;

const HabitMoreInfo = ({ habit, handleRemove }) => {
  if (!habit) {
    return null;
  }

  const completionDays = habit.completions.map((dateObj) => {
    return [new Date(dateObj.thisYear, dateObj.thisMonth, dateObj.thisDay), 1];
  });

  let data = [
    [
      { type: 'date', id: 'Date' },
      { type: 'number', id: 'Completions' }
    ]
  ];

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
        strokeWidth: 1
      },
      monthLabel: {
        fontName: 'Arial',
        fontSize: 12,
        color: '#fad850', // gold
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
      }
    }
  };

  data = data.concat(completionDays);

  return (
    <div>
      <MyHabitsDiv data-cy="back-btn">
        <Link to="/">Back</Link>
      </MyHabitsDiv>
      <Chart
        height={350}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ 'data-testid': '1' }}
      />
      <div>
        <DeleteBtn data-cy="delete-btn" onClick={() => handleRemove(habit)}>Delete</DeleteBtn>
      </div>
    </div>
  );
};

export default HabitMoreInfo;
