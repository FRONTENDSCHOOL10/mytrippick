import { useState, useId } from 'react';
import { string, bool, func } from 'prop-types';
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
    <>
      <label htmlFor={id} hidden={labelHidden}>
        {label}
      </label>
      <input
        type={types}
        id={id}
        className={S.component}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <button hidden={buttonAlive} onClick={handleToggle}>
        {isVisible ? (
          <img src="/icons/non-visible.svg" alt="안보이기" />
        ) : (
          <img src="/icons/visible.svg" />
        )}
      </button>
    </>
  );
}

export default AppInput;
