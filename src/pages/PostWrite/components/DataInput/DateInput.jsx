import { useId, forwardRef } from 'react';
import { string, func } from 'prop-types';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '@/assets/svg/calander.svg?react';
import S from './DateInput.module.css';
import usePostDateStore from '@/stores/usePostDateStore';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      value={value}
      onClick={onClick}
      onFocus={onClick}
      ref={ref}
      placeholder="날짜를 선택해주세요"
      readOnly
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

  const id = useId();

  return (
    <article className={S.component}>
      <label className="label" htmlFor={id}>
        방문한 날짜
      </label>
      <DatePicker
        id={id}
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy.MM.dd"
        locale={ko}
        customInput={
          <CustomInput value={date ? date.toLocaleDateString('ko-KR') : ''} />
        }
      />
    </article>
  );
}

CustomInput.displayName = 'CustomInput';

CustomInput.propTypes = {
  value: string,
  onClick: func,
  onChange: func,
};

export default DateInput;
