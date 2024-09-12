//import { useEffect, useRef } from 'react';
import Search from '@/assets/svg/search.svg?react';
import XButton from '@/assets/svg/xbutton.svg?react';
import S from './PlaceSearchModal.module.css';

//const { kakao } = window;

const dummyData = [
  {
    placeName: '동남스프링 베이커리카페',
    placePosition: '서울 강동구 둔촌제2동 동남로 49길 24',
  },
  {
    placeName: '테라로사 길동점',
    placePosition: '서울 강동구 길동 255-2',
  },
  {
    placeName: '바하마스',
    placePosition: '서울 강동구 길동 진황도로 123',
  },
  {
    placeName: '홍도식당',
    placePosition: '서울 강동구 진황도로 123',
  },
];

function PlaceSearchModal() {
  return (
    <article style={{ width: '100%', padding: 0 }} className={S.component}>
      <div className={S.searchHeader}>
        <h2 className="headline4">여행지 주소</h2>
        <button type="button">
          <XButton aria-label="모달 나가기 버튼 이미지" />
        </button>
      </div>
      <div className={S.inputWrapper}>
        <label htmlFor="SearchAddress" aria-label="검색 아이콘">
          <Search aria-label="검색 아이콘" />
        </label>
        <input
          id="SearchAddress"
          type="text"
          name={'searchAddress'}
          placeholder="여행지를 검색해보세요"
        />
      </div>
      <ul className={S.searchDateList}>
        {dummyData.map((item, index) => (
          <li tabIndex={0} key={index} className={S.searchDateItem}>
            <div className={S.itemWrapper}>
              <p className="title2">{item.placeName}</p>
              <span className="caption">{item.placePosition}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PlaceSearchModal;
