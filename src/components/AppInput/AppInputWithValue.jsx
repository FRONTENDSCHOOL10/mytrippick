import { useId } from 'react';
import PencilIcon from '@/assets/svg/pencil.svg?react';
import { string, bool, func } from 'prop-types';
import S from './AppInputWithValue.module.css';

AppInputWithValue.propTypes = {
  label: string.isRequired,
  labelHidden: bool,
  type: string.isRequired,
  name: string.isRequired,
  placeholder: string,
  value: string,
  onChange: func,
  isPencilOff: bool,
};

function AppInputWithValue({
  label = '',
  labelHidden = false,
  type = 'text',
  name = '',
  placeholder = '',
  value = '',
  onChange,
  isPencilOff = false,
  ...restProps
}) {
  const id = useId();
  return (
    <article className={S.component}>
      <h3 className="sr-only">
        사용자에게 필요로 하는 내용을 작성하는 input 컨테이너
      </h3>
      <label htmlFor={id} className="label" hidden={labelHidden}>
        {label}
      </label>
      <div className={S.inputWrapper}>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />
        <button type="button" hidden={isPencilOff}>
          <PencilIcon />
        </button>
      </div>
    </article>
  );
}
export default AppInputWithValue;
