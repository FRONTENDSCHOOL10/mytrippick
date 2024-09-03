import Bookmarked from '@/assets/svg/bookmarked.svg?react';
import Liked from '@/assets/svg/liked.svg?react';
import Unbookmarked from '@/assets/svg/unbookmarked.svg?react';
import Unliked from '@/assets/svg/unliked.svg?react';
import { bool, func, oneOf } from 'prop-types';
import { useState } from 'react';
import S from './ToggleBtn.module.css';

ToggleBtn.propTypes = {
  type: oneOf(['like', 'bookmark']).isRequired,
  checked: bool,
  onToggle: func,
};

function ToggleBtn({ type, checked = false, onToggle }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  let ariaLabel;
  if (isChecked) {
    if (type === 'like') {
      ariaLabel = '좋아요 해제';
    } else {
      ariaLabel = '북마크 삭제';
    }
  } else {
    if (type === 'like') {
      ariaLabel = '좋아요';
    } else {
      ariaLabel = '북마크 추가';
    }
  }

  return (
    <button className={S.button} onClick={handleClick} aria-label={ariaLabel}>
      {isChecked ? (
        type === 'like' ? (
          <Liked className={S.likeIcon} />
        ) : (
          <Bookmarked className={S.bookmarkIcon} />
        )
      ) : type === 'like' ? (
        <Unliked className={S.likeIcon} />
      ) : (
        <Unbookmarked className={S.bookmarkIcon} />
      )}
    </button>
  );
}

export default ToggleBtn;
