import React from 'react';
import Calendar from './Calender';
import './App.css'
function App() {
  const leapYear = 2024; 
  return (
    <div className="App">
      <Calendar year={leapYear} />
    </div>
  );
}

export default App;
