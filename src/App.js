import React from 'react';
import moment from 'moment';
import Calender from './Calender';
import './App.css';
import './mock/svkm.mock';

function App() { 
  return <Calender date={moment()} />;
}

export default App;
