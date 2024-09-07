import Bookmarked from '@/assets/svg/bookmarked.svg?react';
import Liked from '@/assets/svg/liked.svg?react';
import Unbookmarked from '@/assets/svg/unbookmarked.svg?react';
import Unliked from '@/assets/svg/unliked.svg?react';
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
          <Liked />
        ) : (
          <Bookmarked />
        )
      ) : bookmark === false ? (
        <Unliked />
      ) : (
        <Unbookmarked />
      )}
    </button>
  );
}

export default ToggleBtn;
