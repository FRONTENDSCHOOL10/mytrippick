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
  onSearch: func, // 추가된 prop
};

function AppInput2({
  label,
  labelHidden = true,
  type,
  name,
  defaultValue,
  placeholder,
  onChange,
  onSearch, // 추가된 prop
}) {
  const [types, setTypes] = useState(type);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || '');

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div className={S.AppInput}>
      <label htmlFor={id} hidden={labelHidden}>
        {label}
      </label>
      <div className={S.inputWrapper}>
        <button onClick={handleSearchClick}>
          <SearchIcon />
        </button>
        <input
          type={types}
          id={id}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
