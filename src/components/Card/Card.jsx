import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import { Link } from 'react-router-dom';
import S from './Card.module.css';
import { string, bool, number } from 'prop-types';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';

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
};

function Card({
  type,
  fullSize = false,
  postId,
  photo,
  placePosition,
  placeName,
  likedNum,
  collectionId,
  id,
  userId,
}) {
  const [userData, setUserData] = useState(null); // 유저 프로필
  const pb = new PocketBase('https://mytrippick.pockethost.io');
  useEffect(() => {
    if (type === 'post') return;
    const fetchUserProfile = async () => {
      try {
        const user = await pb.collection('users').getOne(userId, {
          fields: 'userProfile, nickName', // 'userProfile' 필드만 가져오기
        });
        setUserData(user);
      } catch (error) {
      } finally {
      }
    };

    fetchUserProfile();
  }, [userId]);

  // 카드 스타일을 결정하는 로직
  const rankStyled = type === 'rank' && fullSize ? S.rankCardFull : S.rankCard;

  // 카드에 표시될 정보 (타입에 따라 다른 스타일 적용)
  const placeInfo =
    type === 'rank' ? (
      <article className={rankStyled}>
        <div className={S.cardHeader}>
          <div className={S.userInfos}>
            <img
              src={`${
                import.meta.env.VITE_PB_API
              }/files/_pb_users_auth_/${userId}/${userData?.userProfile}`}
              alt={`${userData?.nickName} 프로필 이미지`}
              aria-hidden="true"
            />
            <span className="title3">{userData?.nickName}</span>
          </div>
          {/* <ToggleBtn postId={postId} bookmark /> */}
        </div>
        <figure>
          <img
            className={S.placePhoto}
            src={`${
              import.meta.env.VITE_PB_API
            }/files/${collectionId}/${id}/${photo}`}
            // alt={postInfo.placeName}
          />
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <div className={S.places}>
          <div className={S.placeInfos}>
            <span className={`rank ${S.rankNum}`}>1</span>
            <div className={`title1 ${S.placeTitle}`}>
              {placeName}
              <div className={S.placePosition}>
                <MarkerFill className={S.marker} />
                <span className="caption">{placePosition}</span>
              </div>
            </div>
          </div>
          <div className={S.likeWrapper}>
            {/* 좋아요 수 표시 */}
            <span>{likedNum}</span>
            {/* 좋아요 토글 버튼 */}
            <ToggleBtn userId={userId} postId={postId} />
          </div>
        </div>
      </article>
    ) : (
      <article className={S.listCard}>
        <div className={S.cardHeader}>
          {/* <ToggleBtn postId={postId} bookmark /> */}
        </div>
        <figure>
          <img
            className={S.placePhoto}
            src={`${
              import.meta.env.VITE_PB_API
            }/files/${collectionId}/${id}/${photo}`}
            // alt={postInfo.placeName}
          />
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <div className={S.placeInfos}>
          <span className="title3">{placeName}</span>
          <div className={S.placePosition}>
            <MarkerFill className={S.marker} />
            <span>{placePosition}</span>
          </div>
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
