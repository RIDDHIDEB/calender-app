import React from 'react';
import Calendar from './Calender';

function App() {
  const leapYear = 2024; 
  return (
    <div className="App">
      <Calendar year={leapYear} />
    </div>
  );
}

export default App;
