import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import { Link } from 'react-router-dom';
import { useLikes } from '@/hooks/useLikes';
import ToggleBtn from '../ToggleBtn/ToggleBtn';
import S from './Card.module.css';
import { string, bool, number } from 'prop-types';
import { useUserData } from '@/hooks/useUserData'; // 사용자 정보 훅
import { usePostData } from '@/hooks/usePostData';
import getPbImageURL from '@/api/getPbImageURL';

Card.propTypes = {
  type: string,
  fullSize: bool,
  postId: string.isRequired,
  likedNum: number,
  userId: string.isRequired,
};

function Card({ type, fullSize = false, postId, likedNum, userId }) {
  console.log('userId in Card:', userId);

  const {
    userInfo,
    loading: userLoading,
    error: userError,
  } = useUserData(userId);

  const {
    postInfo,
    loading: postLoading,
    error: postError,
  } = usePostData(postId);

  const { likeCount } = useLikes(postId, userId, likedNum);

  console.log('userId:', userId);

  if (userLoading || postLoading) return <div>로딩 중...</div>;
  // 사용자 또는 게시글 데이터를 가져오는 동안 발생한 에러 처리
  if (userError || postError) {
    console.error('User data fetch error:', userError);
    console.error('Post data fetch error:', postError);
    return <div>에러 발생: {userError || postError}</div>;
  }

  // // userInfo와 postInfo가 없으면 placeInfo를 null로 반환하여 렌더링 중지
  // if (!userInfo || !postInfo) {
  //   return null;
  // }

  // 카드 스타일을 결정하는 로직
  const rankStyled = type === 'rank' && fullSize ? S.rankCardFull : S.rankCard;

  // 카드에 표시될 정보 (타입에 따라 다른 스타일 적용)
  const placeInfo =
    type === 'rank' && userInfo && postInfo ? (
      <article className={rankStyled}>
        <div className={S.cardHeader}>
          <div className={S.userInfos}>
            <img
              src={getPbImageURL(userInfo, 'userProfile')}
              alt={`${userInfo.nickName} 프로필 이미지`}
              aria-hidden="true"
            />
            <span className="title3">{userInfo.nickName}</span>
          </div>
          <ToggleBtn postId={postId} bookmark />
        </div>
        <figure>
          <img
            className={S.placePhoto}
            src={getPbImageURL(postInfo, 'photo')}
            alt={postInfo.placeName}
          />
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <div className={S.places}>
          <div className={S.placeInfos}>
            <span className={`rank ${S.rankNum}`}>1</span>
            <div className={`title1 ${S.placeTitle}`}>
              {postInfo.placeName}
              <div className={S.placePosition}>
                <MarkerFill className={S.marker} />
                <span className="caption">{postInfo.placePosition}</span>
              </div>
            </div>
          </div>
          <div className={S.likeWrapper}>
            {/* 좋아요 수 표시 */}
            <span>{likeCount}</span>
            {/* 좋아요 토글 버튼 */}
            <ToggleBtn postId={postId} />
          </div>
        </div>
      </article>
    ) : (
      <article className={S.listCard}>
        <div className={S.cardHeader}>
          <ToggleBtn postId={postId} bookmark />
        </div>
        <figure>
          {postInfo && (
            <img
              className={S.placePhoto}
              src={getPbImageURL(postInfo, 'photo')}
              alt={postInfo.placeName}
            />
          )}
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <div className={S.placeInfos}>
          {postInfo && (
            <>
              <span className="title3">{postInfo.placeName}</span>
              <div className={S.placePosition}>
                <MarkerFill className={S.marker} />
                <span>{postInfo.placePosition}</span>
              </div>
            </>
          )}
        </div>
      </article>
    );
  return (
    <article
      className={`${S.component} ${type === 'post' ? S.postComponent : ''}`}
    >
      <Link to={''}>{placeInfo}</Link>
    </article>
  );
}
export default Card;
