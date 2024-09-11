import Bookmark from '@/assets/svg/bookmark.svg?react';
import Like from '@/assets/svg/like.svg?react';
import { bool, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import S from './ToggleBtn.module.css';
import { useState, useEffect } from 'react';
import { checkUserLike, addLike, removeLike, fetchLikes } from '@/api/likeApi';

ToggleBtn.propTypes = {
  bookmark: bool,
  postId: string.isRequired,
  userId: string.isRequired, // 유저 ID도 필요합니다.
};

function ToggleBtn({ bookmark = false, postId, userId }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 좋아요 상태 및 좋아요 수 불러오기
  useEffect(() => {
    const loadInitialData = async () => {
      const liked = await checkUserLike(userId, postId);
      const count = await fetchLikes(postId);

      setIsLiked(liked); // checkUserLike가 false 또는 true를 반환해야 함
      setLikeCount(count); // fetchLikes가 숫자를 반환해야 함
    };
    loadInitialData();
  }, [userId, postId]);

  // 좋아요 토글 핸들러
  const handleToggleLike = async () => {
    if (!userId) {
      if (
        confirm(
          '로그인 이후 이용 가능합니다. 로그인 페이지로 이동하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
      return;
    }

    console.log('Toggling like status:', isLiked);

    if (isLiked) {
      const updatedCount = await removeLike(userId, postId, likeCount);
      console.log('Removed like, updated count:', updatedCount);
      setLikeCount(updatedCount);
    } else {
      const updatedCount = await addLike(userId, postId, likeCount);
      console.log('Added like, updated count:', updatedCount);
      setLikeCount(updatedCount);
    }

    setIsLiked(!isLiked);
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
      onClick={handleToggleLike}
      aria-label={labelText}
      title={labelText}
    >
      {bookmark ? <Bookmark /> : <Like />}
    </button>
  );
}

export default ToggleBtn;
