import { useState, useId } from 'react';
import { string, bool, func } from 'prop-types';
import NonVisible from '@/assets/svg/non-visible.svg?react';
import Visible from '@/assets/svg/visible.svg?react';
import SearchIcon from '@/assets/svg/search.svg?react';
import S from './AppInput.module.css';

AppInput2.propTypes = {
  label: string.isRequired,
  labelHidden: bool,
  type: string.isRequired,
  name: string.isRequired,
  defaultValue: string,
  placeholder: string.isRequired,
  onChange: func,
};

function AppInput2({
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
        <SearchIcon className={S.searchIcon} />
        <input
          type={types}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        <button hidden={buttonAlive} onClick={handleToggle}>
          {isVisible ? (
            <NonVisible className={S.eyes} />
          ) : (
            <Visible className={S.eyes} />
          )}
        </button>
      </div>
    </div>
  );
}

export default AppInput2;
