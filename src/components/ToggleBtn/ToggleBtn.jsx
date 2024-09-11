import Bookmark from '@/assets/svg/bookmark.svg?react';
import Like from '@/assets/svg/like.svg?react';
import { useLikes } from '@/hooks/useLikes';
import useGlobalStore from '@/stores/useGlobalStore';
import { bool, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import S from './ToggleBtn.module.css';

ToggleBtn.propTypes = {
  bookmark: bool,
  postId: string.isRequired,
};

function ToggleBtn({ bookmark = false, postId }) {
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useGlobalStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userId: state.userId,
  }));

  const { isLiked, handleToggleLike } = useLikes(postId, userId);

  const handleClick = () => {
    if (!isLoggedIn) {
      if (
        confirm(
          '로그인 이후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    } else {
      handleToggleLike(); // 좋아요 상태 변경
    }
  };

  // 버튼 라벨 텍스트 설정
  let labelText = isLiked
    ? bookmark
      ? '북마크 취소'
      : '좋아요 취소'
    : bookmark
    ? '북마크 추가'
    : '좋아요';

  return (
    <button
      className={S.button}
      onClick={handleClick}
      aria-label={labelText}
      title={labelText}
    >
      {isLiked ? (
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
