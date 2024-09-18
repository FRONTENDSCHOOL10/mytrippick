import Bookmark from '@/assets/svg/bookmark.svg?react';
import Like from '@/assets/svg/like.svg?react';
import { bool, any } from 'prop-types';
import S from './ToggleBtn.module.css';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '@/stores/useGlobalStore';

ToggleBtn.propTypes = {
  bookmark: bool,
  isToggle: bool,
  onClick: any,
};

function ToggleBtn({ bookmark = false, isToggle = false, onClick }) {
  const navigate = useNavigate();
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  // 좋아요 토글 핸들러
  const handleToggleLike = () => {
    if (!isLoggedIn) {
      if (
        confirm(
          '로그인 이후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    } else {
      onClick && onClick(); // 좋아요 상태 변경
      console.log('좋아요 상태 변경');
    }
  };

  // 버튼 라벨 텍스트 설정
  let labelText = isToggle
    ? bookmark
      ? '북마크 취소'
      : '좋아요 취소'
    : bookmark
    ? '북마크 추가'
    : '좋아요 추가';

  return (
    <button
      className={`${S.toggleBtn} ${
        isToggle && isLoggedIn
          ? bookmark
            ? S.bookmarked
            : S.liked
          : bookmark
          ? S.bookmark
          : S.like
      }`}
      onClick={handleToggleLike}
      aria-label={labelText}
      title={labelText}
    >
      {bookmark ? <Bookmark /> : <Like />}
    </button>
  );
}

export default ToggleBtn;
