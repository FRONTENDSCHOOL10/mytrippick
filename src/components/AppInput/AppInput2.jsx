import React, { useState, useId } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@/assets/svg/search.svg?react';
import XButton from '@/assets/svg/xbutton.svg?react';
import S from './AppInput2.module.css';

function AppInput2({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const id = useId();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const deleteContent = () => {
    setInputValue('');
  };

  return (
    <div className={S.AppInput}>
      <div className={S.inputWrapper}>
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
        <input
          type="text"
          id={id}
          placeholder="여행지를 검색해보세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {inputValue && (
          <button onClick={deleteContent} className={S.clearButton}>
            <XButton />
          </button>
        )}
      </div>
    </div>
  );
}

AppInput2.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default AppInput2;
