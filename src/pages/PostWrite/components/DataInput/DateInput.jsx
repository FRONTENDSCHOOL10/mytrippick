import { forwardRef } from 'react';
import { string, func } from 'prop-types';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '@/assets/svg/calander.svg?react';
import S from './DateInput.module.css';
import usePostDateStore from '@/stores/usePostDateStore';

const CustomInput = forwardRef(({ value, onClick, onKeyDown }, ref) => (
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      value={value}
      onClick={onClick}
      onFocus={onClick}
      ref={ref}
      placeholder="날짜를 선택해주세요"
      readOnly
      onKeyDown={onKeyDown}
    />
    <Calendar
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}
    />
  </div>
));

function DateInput() {
  const { date, setDate } = usePostDateStore();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.target.click();
    }
    if (e.key === 'Tab') {
      const nextElement = e.target.nextElementSibling;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return (
    <article className={S.component}>
      <h3 className="sr-only">날짜 선택 input 공간</h3>
      <label className="label">방문한 날짜</label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy.MM.dd"
        locale={ko}
        customInput={
          <CustomInput
            value={date ? date.toLocaleDateString('ko-KR') : ''}
            onKeyDown={handleKeyDown}
          />
        }
        onCalendarClose={() => {
          const nextElement = document.activeElement.nextElementSibling;
          if (nextElement) {
            nextElement.focus();
          }
        }}
      />
    </article>
  );
}

CustomInput.displayName = 'CustomInput';

CustomInput.propTypes = {
  value: string,
  onClick: func,
  onChange: func,
  onKeyDown: func,
};

export default DateInput;
