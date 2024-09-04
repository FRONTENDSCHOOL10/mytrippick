import { Link } from 'react-router-dom';
import MarkerFill from '@/assets/svg/marker-fill.svg?react';
import S from './Card.module.css';

function ListCard({ type }) {
  const placeInfo =
    type === 'rank' ? (
      <article>
        <div>
          <p>
            <span>1.</span>아쿠아 플래넷
          </p>
          <div>
            <span>556</span>
            <button>❤</button>
          </div>
        </div>
        <span>
          <MarkerFill />
          서울, 도봉구
        </span>
      </article>
    ) : (
      <article>
        <p>아쿠아 플래넷</p>
        <span>
          <MarkerFill />
          서울, 도봉구
        </span>
      </article>
    );
  return (
    <article className={S.component}>
      <Link to={''}>
        <img src="/testingPic(delete-later).png" alt="" />
        {placeInfo}
      </Link>
    </article>
  );
}
export default ListCard;
