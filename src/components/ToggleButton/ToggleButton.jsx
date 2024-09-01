import { useState } from 'react';
import { oneOf, bool, func } from 'prop-types';
import S from './ToggleButton.module.css';

ToggleButton.propTypes = {
  type: oneOf(['like', 'bookmark']).isRequired,
  checked: bool,
  onToggle: func,
};

function ToggleButton({ type, checked = false, onToggle }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  let altText;
  if (isChecked) {
    if (type === 'like') {
      altText = '좋아요';
    } else {
      altText = '북마크 추가';
    }
  } else {
    if (type === 'like') {
      altText = '좋아요 해제';
    } else {
      altText = '북마크 삭제';
    }
  }

  return (
    <button className={S.button} onClick={handleClick}>
      <img
        src={
          isChecked
            ? type === 'like'
              ? '/public/liked.svg'
              : '/public/bookmarked.svg'
            : type === 'like'
            ? '/public/unliked.svg'
            : '/public/unbookmarked.svg'
        }
        alt={altText}
      />
    </button>
  );
}

export default ToggleButton;
