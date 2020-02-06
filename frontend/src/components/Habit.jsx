import React from 'react';
import { Link } from 'react-router-dom';

const Habit = ({ habit, handleCompletion }) => {
  const findByMatchingDate = (completions, dateObj) => {
    return completions.filter((completion) => {
      console.log('completion', completion);
      console.log('object.keys(dateObj', Object.keys(dateObj));
      return Object.keys(dateObj).every((key) => {
        console.log('key', key);
        console.log('completion[key]', completion[key]);
        console.log('dateObj[key]', dateObj[key]);
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

  console.log('todayObj', todayObj);

  const result = findByMatchingDate(habit.completions, todayObj);

  console.log('result', result);
  return (
    <div>
      <Link to={`/habits/${habit.id}`}>{habit.name}</Link>
      {result.length > 0 ? null : (
        <button onClick={() => handleCompletion(habit)}>Done for today!</button>
      )}
    </div>
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