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

  console.log('userId in ToggleBtn:', userId);
  console.log('postId in ToggleBtn:', postId);

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

  // 좋아요/북마크 상태에 따른 클래스 설정
  const buttonClass = isLiked
    ? bookmark
      ? S.bookmarked
      : S.liked
    : bookmark
    ? S.bookmark
    : S.like;

  return (
    <button
      className={`${S.toggleBtn} ${buttonClass}`}
      onClick={handleClick}
      aria-label={labelText}
      title={labelText}
    >
      {bookmark ? <Bookmark /> : <Like />}
    </button>
  );
}

export default ToggleBtn;
