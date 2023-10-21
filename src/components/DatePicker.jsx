import { format } from "date-fns";
import Calendar from "./Calendar";
import { useState } from "react";

const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='date-picker-container'>
      <button
        className='date-picker-button'
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        value={value}
      >
        {value === null ? "Select a Date" : format(value, "MMM do, yyyy")}
      </button>
      {isOpen && <Calendar value={value} onChange={onChange} />}
    </div>
  );
};

export default DatePicker;
