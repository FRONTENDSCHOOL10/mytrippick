import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import { Link } from 'react-router-dom';
import ToggleBtn from '../ToggleBtn/ToggleBtn';
import S from './Card.module.css';

function Card({ type, fullSize = false }) {
  const rankStyled = type == 'rank' && fullSize ? S.rankCardFull : S.rankCard;

  const placeInfo =
    type === 'rank' ? (
      <article className={rankStyled}>
        <img
          className={S.placePic}
          src="/testingPic(delete-later).png"
          alt=""
        />
        <article className={S.cardHeader}>
          <div className={S.userInfos}>
            <img src="/testUserPic(delete-later).png" alt="" />
            <p>사용자</p>
          </div>
          <ToggleBtn bookmark />
        </article>
        <article className={S.places}>
          <div className={S.placeInfos}>
            <p>
              <span>1. </span>아쿠아 플래넷
            </p>
            <div className={S.placePosition}>
              <MarkerFill className={S.marker} />
              <span>서울, 도봉구</span>
            </div>
          </div>
          <div className={S.heartWrapper}>
            <span>556</span>
            <ToggleBtn />
          </div>
        </article>
      </article>
    ) : (
      <article className={S.listCard}>
        <img
          className={S.placePic}
          src="/testingPic(delete-later).png"
          alt=""
        />
        <div className={S.cardHeader}>
          <ToggleBtn bookmark />
        </div>
        <div className={S.placeInfos}>
          <p>아쿠아 플래넷</p>
          <div className={S.placePosition}>
            <MarkerFill className={S.marker} />
            <span>서울, 도봉구</span>
          </div>
        </div>
      </article>
    );
  return (
    <article className={S.component}>
      <Link to={''}>{placeInfo}</Link>
    </article>
  );
}
export default Card;
