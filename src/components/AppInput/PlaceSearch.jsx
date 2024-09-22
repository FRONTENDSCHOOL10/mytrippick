import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@/assets/svg/search.svg?react';
import XButton from '@/assets/svg/xbutton.svg?react';
import S from './PlaceSearch.module.css';

function PlaceSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const id = useId();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
    setInputValue('');
    setIsOpen(false);
  };

  const deleteContent = () => {
    setInputValue('');
  };

  return (
    isOpen && (
      <div className={S.AppInput}>
        <div className={S.inputWrapper}>
          <button className={S.searchButton} onClick={handleSearch}>
            <SearchIcon />
          </button>
          <input
            type="text"
            id={id}
            placeholder="여행지를 검색해보세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={S.Searchinput}
          />
          {inputValue && (
            <button onClick={deleteContent} className={S.clearButton}>
              <XButton />
            </button>
          )}
        </div>
      </div>
    )
  );
}

PlaceSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default PlaceSearch;
