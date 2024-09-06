import Bookmarked from '@/assets/svg/bookmarked.svg?react';
import Liked from '@/assets/svg/liked.svg?react';
import Unbookmarked from '@/assets/svg/unbookmarked.svg?react';
import Unliked from '@/assets/svg/unliked.svg?react';
import useGlobalStore from '@/stores/useGlobalStore';
import { bool } from 'prop-types';
import S from './ToggleBtn.module.css';

ToggleBtn.propTypes = {
  Bookmark: bool,
};

function ToggleBtn({ Bookmark = false }) {
  const isToggled = useGlobalStore((state) => state.isToggled);
  const setIsToggled = useGlobalStore((state) => state.setIsToggled);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  let labelText;
  if (isToggled) {
    if (Bookmark === false) {
      labelText = '좋아요 해제';
    } else {
      labelText = '북마크 삭제';
    }
  } else {
    if (Bookmark === false) {
      labelText = '좋아요';
    } else {
      labelText = '북마크 추가';
    }
  }

  return (
    <button
      className={S.button}
      onClick={handleClick}
      aria-label={labelText}
      title={labelText}
    >
      {isToggled ? (
        Bookmark === false ? (
          <Liked />
        ) : (
          <Bookmarked />
        )
      ) : Bookmark === false ? (
        <Unliked />
      ) : (
        <Unbookmarked />
      )}
    </button>
  );
}

export default ToggleBtn;
