import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import { Link } from 'react-router-dom';
import S from './Card.module.css';
import { string, bool, number } from 'prop-types';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useState } from 'react';
import axios from 'axios';

Card.propTypes = {
  type: string.isRequired,
  fullSize: bool,
  postId: string,
  photo: string,
  placePosition: string,
  placeName: string,
  likedNum: number,
  collectionId: string,
  id: string,
  userId: string,
  nickName: string,
  userProfile: string,
  idx: number,
  isLiked: bool,
  isBookmarked: bool,
};

function Card({
  type,
  fullSize = false,
  photo,
  placePosition,
  placeName,
  likedNum,
  collectionId,
  id, //postId
  userId,
  nickName,
  userProfile,
  idx,
  isLiked,
  isBookmarked,
}) {
  // 카드 스타일을 결정하는 로직
  const rankStyled = type === 'rank' && fullSize ? S.rankCardFull : S.rankCard;
  const API_URL = import.meta.env.VITE_PB_URL;
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const setLikedPostIds = useGlobalStore((state) => state.setLikedPostIds);
  const [num, setNum] = useState(null);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const setBookmarkedPostIds = useGlobalStore(
    (state) => state.setBookmarkedPostIds
  );

  const updatePostLikes = async () => {
    try {
      await axios.patch(`${API_URL}/api/collections/posts/records/${id}`, {
        likedNum: isLiked ? num - 1 : num + 1,
      });
      console.log('게시물 업데이트 성공');
    } catch (error) {
      console.error('게시물 업데이트 실패:', error);
    }
  };

  const handleLikes = () => {
    if (isLiked) {
      setLikedPostIds(likedPostIds.filter((postId) => postId !== id));
      setNum(num - 1);
      console.log(`id: ${id}, num: ${num}`);
    } else {
      setLikedPostIds([...likedPostIds, id]);
      setNum(num + 1);
      console.log(`id: ${id}, num: ${num}`);
    }
    updatePostLikes();
  };

  const handleBookmarks = () => {
    if (isBookmarked) {
      setBookmarkedPostIds(bookmarkedPostIds.filter((postId) => postId !== id));
    } else {
      setBookmarkedPostIds([...bookmarkedPostIds, id]);
    }
  };

  useEffect(() => {
    setNum(likedNum);
  }, [likedNum]);

  // 카드에 표시될 정보 (타입에 따라 다른 스타일 적용)
  const placeInfo =
    type === 'rank' ? (
      <article className={`${S.rankCard} ${rankStyled}`}>
        <div className={S.cardHeader}>
          <div className={S.userInfos}>
            <img
              src={`${
                import.meta.env.VITE_PB_API
              }/files/_pb_users_auth_/${userId}/${userProfile}`}
              alt={`${nickName} 프로필 이미지`}
              aria-hidden="true"
            />
            <span className="title3">{nickName}</span>
          </div>
          <ToggleBtn
            bookmark
            isToggle={isBookmarked}
            onClick={handleBookmarks}
          />
        </div>
        <Link to={`/posts/${id}`}>
          <figure>
            <img
              className={S.placePhoto}
              src={`${
                import.meta.env.VITE_PB_API
              }/files/${collectionId}/${id}/${photo}`}
              alt={placeName}
            />
            <span role="none" className={S.dimThumb}></span>
          </figure>
        </Link>
        <div className={S.places}>
          <Link to={`/posts/${id}`} tabindex="-1">
            <div className={S.placeInfos}>
              <span className={`rank ${S.rankNum}`}>{idx + 1}</span>
              <div className={S.placeTitleWrapper}>
                <h2 className={`title1 ${S.placeTitle}`}>{placeName}</h2>
                <div className={S.placePosition}>
                  <MarkerFill className={S.marker} />
                  <span className="caption">{placePosition}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className={S.likeWrapper}>
            {/* 좋아요 수 표시 */}
            <span>{num}</span>
            {/* 좋아요 토글 버튼 */}
            <ToggleBtn isToggle={isLiked} onClick={handleLikes} />
          </div>
        </div>
      </article>
    ) : (
      <article className={S.listCard}>
        <div className={S.cardHeader}>
          <ToggleBtn bookmark />
        </div>
        <Link to={`/posts/${id}`}>
          <figure>
            <img
              className={S.placePhoto}
              src={`${
                import.meta.env.VITE_PB_API
              }/files/${collectionId}/${id}/${photo}`}
              alt={placeName}
            />
            <span role="none" className={S.dimThumb}></span>
          </figure>
        </Link>
        <Link to={`/posts/${id}`} tabindex="-1">
          <div className={S.placeInfos}>
            <h2 className="title3">{placeName}</h2>
            <div className={S.placePosition}>
              <MarkerFill className={S.marker} />
              <span>{placePosition}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  return (
    <div className={`${S.component} ${type === 'post' ? S.postComponent : ''}`}>
      {placeInfo}
    </div>
  );
}
export default Card;
