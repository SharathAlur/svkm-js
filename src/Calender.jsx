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

export function Calendar(props) {
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const today = moment();
  const [date, setDate] = useState(props.date);
  const [day, setDay] = useState(date.date());
  const [month, setMonth] = useState(date.month());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setDay(date.date());
    setMonth(date.month());
    setStartDay(getStartDayOfMonth(date));
  }, [date, getStartDayOfMonth]);

  useEffect(() => {
    getBookings().then(bookings => setBookings(bookings));
  }, [month])

  function getStartDayOfMonth(date) {
    return moment(`${date.format('YYYYMM')}01`).day();
  }

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(moment(date.format('YYYYMMDD')).add(-1, 'month'))}>Prev</Button>
        <div>
          {date.format('MMM')} {date.year()}
        </div>
        <Button onClick={() => setDate(moment(date.format('YYYYMMDD')).add(1, 'month'))}>Next</Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <Day key={d} isWeekString>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(date.daysInMonth() + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            const currentDate = moment(`${date.format('YYYYMM')}${d}`);
            const dateString = currentDate.format('YYYYMMDD');
            return (
              <Day
                key={dateString}
                isToday={today.isSame(currentDate, 'day')}
                isSelected={d === day}
                isAvailable
                onClick={() => setDate(currentDate)}
                isBooked={!!bookings[dateString]}
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