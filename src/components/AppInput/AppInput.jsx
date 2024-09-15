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
  isRequired: bool,
};

function AppInput({
  label = '',
  labelHidden = true,
  type = 'text',
  name = '',
  defaultValue = '',
  placeholder = '',
  onChange,
  isRequired = true,
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

  const buttonText = isVisible ? '비밀번호 감추기' : '비밀번호 보기';

  return (
    <article className={S.AppInput}>
      <h3 className="sr-only">{label} input 공간</h3>
      <label className="label" htmlFor={id} hidden={labelHidden}>
        {label}
      </label>
      <div className={S.inputWrapper}>
        <input
          type={types}
          id={id}
          className="input"
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          required={isRequired}
        />
        <button
          type="button"
          title={buttonText}
          hidden={buttonAlive}
          onClick={handleToggle}
        >
          {isVisible ? (
            <NonVisible
              className={S.eyes}
              aria-label="비밀번호 다시 가리는 버튼"
              title="비밀번호 가리기"
            />
          ) : (
            <Visible className={S.eyes} aria-label="비밀번호 볼 수 있는 버튼" />
          )}
        </button>
      </div>
    </article>
  );
}

export default AppInput;
