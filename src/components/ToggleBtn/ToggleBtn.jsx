import Bookmark from '@/assets/svg/bookmark.svg?react';
import Like from '@/assets/svg/like.svg?react';
import useGlobalStore from '@/stores/useGlobalStore';
import { bool } from 'prop-types';
import { useId } from 'react';
import S from './ToggleBtn.module.css';

ToggleBtn.propTypes = {
  bookmark: bool,
};

function ToggleBtn({ bookmark = false }) {
  const ToggleBtnId = useId();

  const { toggles, toggle } = useGlobalStore((state) => ({
    toggles: state.toggles,
    toggle: state.toggle,
  }));

  const isToggled = toggles[ToggleBtnId] || false;

  const handleClick = () => toggle(ToggleBtnId);

  let labelText;
  if (isToggled) {
    if (bookmark === false) {
      labelText = '좋아요 해제';
    } else {
      labelText = '북마크 삭제';
    }
  } else {
    if (bookmark === false) {
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
      id={ToggleBtnId}
    >
      {isToggled ? (
        bookmark === false ? (
          <Like className={S.liked} />
        ) : (
          <Bookmark className={S.bookmarked} />
        )
      ) : bookmark === false ? (
        <Like className={S.like} />
      ) : (
        <Bookmark className={S.bookmark} />
      )}
    </button>
  );
}

export default ToggleBtn;
