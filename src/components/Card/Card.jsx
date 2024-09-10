import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import { Link } from 'react-router-dom';
import ToggleBtn from '../ToggleBtn/ToggleBtn';
import S from './Card.module.css';
import { string, bool, number } from 'prop-types';

Card.propTypes = {
  type: string,
  fullSize: bool,
  thumbnailImg: string,
  likedNum: number,
  title: string,
  location: string,
  userImg: string,
  userName: string,
};

function Card({
  type,
  fullSize = false,
  thumbnailImg,
  likedNum,
  title,
  location,
  userImg,
  userName,
}) {
  const rankStyled = type == 'rank' && fullSize ? S.rankCardFull : S.rankCard;

  const placeInfo =
    type === 'rank' ? (
      <article className={rankStyled}>
        <div className={S.cardHeader}>
          <div className={S.userInfos}>
            <img
              src={userImg}
              alt={`${userName}프로필 이미지`}
              aria-hidden="true"
            />
            <span className="title3">{userName}</span>
          </div>
          <ToggleBtn bookmark />
        </div>
        <figure>
          <img className={S.placePhoto} src={thumbnailImg} alt={title} />
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <article className={S.places}>
          <div className={S.placeInfos}>
            <span className={`rank ${S.rankNum}`}>1</span>
            <div className={`title1 ${S.placeTitle}`}>
              {title}
              <div className={S.placePosition}>
                <MarkerFill className={S.marker} />
                <span className="caption">{location}</span>
              </div>
            </div>
          </div>
          <div className={S.heartWrapper}>
            <span>{likedNum}</span>
            <ToggleBtn />
          </div>
        </article>
      </article>
    ) : (
      <article className={S.listCard}>
        <div className={S.cardHeader}>
          <ToggleBtn bookmark />
        </div>
        <figure>
          <img className={S.placePhoto} src={thumbnailImg} alt={title} />
          <span role="none" className={S.dimThumb}></span>
        </figure>
        <div className={S.placeInfos}>
          <span className="title3">{title}</span>
          <div className={S.placePosition}>
            <MarkerFill className={S.marker} />
            <span>{location}</span>
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
