import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  border: 1px solid black;
  height: 90px;
`

const StyledLink = styled(Link)`
  color: #000000;

`

const DoneBtn = styled.button`
  background: #fff870;
  &:hover {
    background: #a8ff36;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
`

const DoneNotif = styled.div`
  background: #73ff00;
  width: 50px;
  font-size: 0.9em;
  margin: auto;
  margin-top: 1em;
  border: 2px solid #000000;
  border-radius: 3px;
  text-align: center;

`

const Habit = ({ habit, handleCompletion }) => {
  if (!habit) {
    return null
  };

  const findByMatchingDate = (completions, dateObj) => {
    return completions.filter((completion) => {
      return Object.keys(dateObj).every((key) => {
        return completion[key] === dateObj[key];
      });
    });
  };

  const today = new Date();
  const todayObj = {
    thisDay: today.getDate(),
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear()
  };

  console.log('habit in Habit', habit)
  const matchingDates = findByMatchingDate(habit.completions, todayObj);

  return (
    <Div>
      <StyledLink to={`/habits/${habit.id}`}>{habit.name}</StyledLink>
      {matchingDates.length > 0 ? (<DoneNotif>Done!</DoneNotif>) : (
        <div>
          <DoneBtn onClick={() => handleCompletion(habit)}>Done for today!</DoneBtn>
        </div>
      )}
    </Div>
  );
};

export default Habit;

// const Habit = ({ habit, handleRemove }) => {
//   if (!habit) {
//     return null;
//   }

//   console.log('Habit in Habit:::', habit)
  
//   const completionDays = habit.completions.map(dateObj => {
//     return [new Date(dateObj.thisYear, dateObj.thisMonth, dateObj.thisDay), 1]
//   })

//   // const dataThatWorks = [
//   //   [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
//   //   [new Date(2012, 3, 13), 37032],
//   //   [new Date(2012, 3, 14), 38024],
//   //   [new Date(2012, 3, 15), 38024],
//   //   [new Date(2013, 2, 10), 38447]
//   // ]
  
//   let data = [
//     [
//       { type: 'date', id: 'Date' },
//       { type: 'number', id: 'Completions'}
//     ],
//   ]

//   const options = {
//     title: habit.name,
//     noDataPattern: {
//       backgroundColor: '#000000',
//       color: '#000000'
//     },
//     colorAxis: {
//       minValue: 0,
//       colors: ['#00e5ff', '#73ff00']
//     },
//     calendar: {
//       cellSize: 25,
//       cellColor: {
//         stroke: '#e3e3e3',
//         strokeOpacity: 0.5,
//         strokeWidth: 1
//       },
//       focusedCellColor: {
//         stroke: '#d3362d', // white
//         strokeOpacity: 1,
//         strokeWidth: 1,
//       },
//       monthLabel: {
//         fontName: 'Arial',
//         fontSize: 12,
//         color: '#d3362d', // burgundy red
//         bold: true,
//         italic: true
//       },
//       monthOutlineColor: {
//         stroke: '#fad850', // gold
//         strokeOpacity: 0.8,
//         strokeWidth: 3
//       },
//       unusedMonthOutlineColor: {
//         stroke: '#bc5679', // reddish
//         strokeOpacity: 0.8,
//         strokeWidth: 2
//       },
//       underMonthSpace: 16,
//       underYearSpace: 10,
//       yearLabel: {
//         fontName: 'Arial',
//         fontSize: 32,
//         color: '#695508', // mustard
//         bold: true
//       },
//      },

//   }

//   data = data.concat(completionDays)

//   console.log('completionDays', completionDays)

//   return (
//     <div>
//       <Chart
//         width={750}
//         height={350}
//         chartType="Calendar"
//         loader={<div>Loading Chart</div>}
//         data={data}
//         options={options}
//         rootProps={{ 'data-testid': '1' }}
//       />
//       <div>
//         <button onClick={() => handleRemove(habit)}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default Habit