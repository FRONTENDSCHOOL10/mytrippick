import { useState, useId } from 'react';
import { string, bool, func } from 'prop-types';
import NonVisible from '@/assets/svg/non-visible.svg?react';
import Visible from '@/assets/svg/visible.svg?react';
import S from './AppInput.module.css';

AppInput.propTypes = {
  label: string.isRequired,
  labelHidden: bool,
  type: string.isRequired,
  name: string.isRequired,
  defaultValue: string,
  placeholder: string.isRequired,
  onChange: func,
};

function AppInput({
  label,
  labelHidden = true,
  type,
  name,
  defaultValue,
  placeholder,
  onChange,
}) {
  const [types, setTypes] = useState(type);
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  let buttonAlive = true;

  if (types === 'password' || (types === 'text' && isVisible)) {
    buttonAlive = false;
  }

  const handleToggle = () => {
    if (isVisible) {
      setIsVisible(false);
      setTypes('password');
    } else {
      setIsVisible(true);
      setTypes('text');
    }
  };

  return (
    <div className={S.AppInput}>
      <label htmlFor={id} hidden={labelHidden}>
        {label}
      </label>
      <div className={S.inputWrapper}>
        <input
          type={types}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        <button type="button" hidden={buttonAlive} onClick={handleToggle}>
          {isVisible ? (
            <NonVisible
              className={S.eyes}
              aria-label="비밀번호 다시 가리는 버튼"
            />
          ) : (
            <Visible className={S.eyes} aria-label="비밀번호 볼 수 있는 버튼" />
          )}
        </button>
      </div>
    </div>
  );
}

export default AppInput;
