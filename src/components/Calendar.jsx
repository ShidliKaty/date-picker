import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

const Calendar = ({ value, onChange }) => {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date());

  const showPreviousMonth = () => {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, -1);
    });
  };
  const showNextMonth = () => {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1);
    });
  };

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: 1 }),
  });

  return (
    <div className='date-picker'>
      <div className='date-picker-header'>
        <button
          className='prev-month-button month-button'
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className='current-month'>
          {format(visibleMonth, "MMMM - yyyy")}
        </div>
        <button
          className='next-month-button month-button'
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className='date-picker-grid-header date-picker-grid'>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className='date-picker-grid-dates date-picker-grid'>
        {visibleDates.map((date) => (
          <button
            onClick={() => onChange(date)}
            key={date.toDateString()}
            className={`date ${
              !isSameMonth(date, visibleMonth) && "date-picker-other-month-date"
            } ${isSameDay(date, value) && "selected"} ${
              isToday(date) && "today"
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
