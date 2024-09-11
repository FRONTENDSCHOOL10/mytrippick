import { useState, useId } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calender from '@/assets/svg/calander.svg?react';
import S from './DateInput.module.css';

function CustomInput({ value, onClick }) {
  return (
    <>
      <input type="text" />
      <Calender className={S.calendarIcon} />
    </>
  );
}

function DateInput() {
  const [startDate, setStartDate] = useState(new Date());
  const id = useId();

  return (
    <article className={S.component}>
      <label className="label" htmlFor={id}>
        방문한 날짜
      </label>
      <DatePicker
        id={id}
        dateFormat="yyyy.MM.dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
      />
    </article>
  );
}

export default DateInput;
