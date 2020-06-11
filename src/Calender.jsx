import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Day from './Day';
import { getBookings } from './services';

const Frame = styled.div`
  width: 600px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px #eee;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f6fa;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// const Day = styled.div`
//   width: 14.2%;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   ${props =>
//     props.isToday &&
//     css`
//       border: 1px solid red;
//     `}

//   ${props =>
//     props.isSelected &&
//     css`
      
//     `}
// `;

export function Calendar() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const today = moment();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.date());
  const [month, setMonth] = useState(date.month());
  const [year, setYear] = useState(date.year());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setDay(date.date());
    setMonth(date.month());
    setYear(date.year());
    setStartDay(getStartDayOfMonth(date));
  }, [date, getStartDayOfMonth]);

  useEffect(() => {
    getBookings().then(bookings => setBookings(bookings));
  }, [month])

  function getStartDayOfMonth(date) {
    return moment(date).add(1 - date.date(), 'day').day();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(date.add(-1, 'month'))}>Prev</Button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button onClick={() => setDate(date.add(1, 'month'))}>Next</Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <Day key={d} isWeekString>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            const currentDate = `${year}-${month + 1}-${d}`;
            return (
              <Day
                key={currentDate}
                isToday={d === today.date()}
                isSelected={d === day}
                isAvailable
                onClick={() => setDate(moment(currentDate))}
                isBooked={!!bookings[currentDate]}
              >
                {d > 0 ? d : ''}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}

export default Calendar;