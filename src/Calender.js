// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getDay, format, eachWeekOfInterval, getWeek } from 'date-fns';

// const Calendar = ({ year }) => {
//   const [searchDate, setSearchDate] = useState('');
//   const [historicalEvents, setHistoricalEvents] = useState([]);
//   const startDate = new Date(year, 0, 1);
//   const endDate = new Date(year, 11, 31);
//   const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

//   useEffect(() => {
//     if (searchDate) {
//       axios({
//         method: 'GET',
//         url: 'https://historical-events-by-api-ninjas.p.rapidapi.com/v1/historicalevents',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-RapidAPI-Host': 'historical-events-by-api-ninjas.p.rapidapi.com',
//           'X-RapidAPI-Key': '56081cf632mshf0041bf3feed38dp148381jsnc7ee8f1d90b2',
//         },
//         params: {
//           date: searchDate,
//         },
//       })
//         .then((response) => {
//           setHistoricalEvents(response.data.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching historical events', error);
//         });
//     }
//   }, [searchDate]);

//   const handleSearch = () => {
//     const searchResult = new Date(searchDate);
//     if (!isNaN(searchResult.getTime())) {
//       alert(`Day: ${format(searchResult, 'EEEE')}, Week Number: ${getWeek(searchResult)}`);
//     } else {
//       alert('Invalid date format. Please enter a valid date.');
//     }
//   };

//   return (
//     <div>
//       <h2>{year} Leap Year Calendar</h2>
//       <div>
//         Search Date: 
//         <input
//           type="text"
//           placeholder="YYYY-MM-DD"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {historicalEvents.length > 0 && (
//         <div>
//           <h3>Historical Events for {searchDate}:</h3>
//           <ul>
//             {historicalEvents.map((event) => (
//               <li key={event.id}>{event.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <table>
//       <thead>
//           <tr>
//             <th>Week</th>
//             <th>Mon</th>
//             <th>Tue</th>
//             <th>Wed</th>
//             <th>Thu</th>
//             <th>Fri</th>
//             <th>Sat</th>
//             <th>Sun</th>
//           </tr>
//         </thead>
//         <tbody>
//           {weeks.map((weekStartDate, index) => (
//             <tr key={index}>
//               <td>{getWeek(weekStartDate)}</td>
//               {[...Array(7)].map((_, dayIndex) => {
//                 const currentDate = new Date(weekStartDate);
//                 currentDate.setDate(currentDate.getDate() + dayIndex);
//                 return (
//                   <td key={dayIndex} className={getDay(currentDate) === 0 ? 'sunday' : ''}>
//                     {format(currentDate, 'd')}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Calendar;

//=========

import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Calender.css';

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
//   const [leapYear, setLeapYear] = useState(false);

//   const handleCheckLeapYear = () => {
//     setLeapYear((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
//   };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    return (  
        <>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <h2>{year} Calendar</h2>
            <div className='calender-container'>
            {months.map((month, index) => (
                <div key={index} className='month-container'>
                <h3>{month}</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                    </thead>
                    <tbody>
                    {generateMonthDays(index, year).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <td key={dayIndex}>{day > 0 ? day : ''}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ))}
            </div>
        </div>
      </>
    );
  };

  const generateMonthDays = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    let days = [];
    let currentDay = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.push(-1); // Placeholder for days before the start of the month
        } else if (currentDay <= daysInMonth) {
          week.push(currentDay++);
        } else {
          week.push(-1); // Placeholder for days after the end of the month
        }
      }
      days.push(week);
    }

    return days;
  };

  return (
    <div>
      <h1>Leap Year Calendar</h1>
      <div>
        <label>
          Enter a year:
          <input
            style={{height:"30px"}}
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
          />
        </label>
        {/* <Button variant='contained' onClick={handleCheckLeapYear} style={{margin:"10px"}}>Check Leap Year</Button>
        {leapYear && <p>{year} is a leap year!</p>} */}
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;

