import { useState, useEffect, useRef } from 'react';
import usePlaceDateStore from '@/stores/usePlaceDataStore';
import { debounce } from '@/utils';
import { func } from 'prop-types';
import Search from '@/assets/svg/search.svg?react';
import XButton from '@/assets/svg/xbutton.svg?react';
import S from './PlaceSearchModal.module.css';

const { kakao } = window;

PlaceSearchModal.propTypes = {
  closeModal: func,
};

function PlaceSearchModal({ closeModal }) {
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);
  const searchInputRef = useRef(null);

  const { setPlaceName, setPlaceAddress, setPlaceLatLang } = usePlaceDateStore(
    (state) => ({
      setPlaceName: state.setPlaceName,
      setPlaceAddress: state.setPlaceAddress,
      setPlaceLatLang: state.setPlaceLatLang,
    })
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    const searchPlaces = (keyword) => {
      if (!keyword || !keyword.trim()) {
        setPlaceName(null);
        setPlaceAddress(null);
        setPlaceLatLang(null);
        return;
      }

      ps.keywordSearch(keyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setPlaces([]);
          setPlaceName(null);
          setPlaceAddress(null);
          setPlaceLatLang(null);
          alert('검색 결과가 없습니다😭');
        } else {
          alert('검색 결과 중 오류가 발생했습니다.');
        }
      });
    };

    const handleInputChange = debounce(() => {
      const keyword = searchInputRef.current?.value;
      searchPlaces(keyword);
    }, 300);

    searchInputRef.current?.addEventListener('input', handleInputChange);

    return () => {
      searchInputRef.current?.removeEventListener('input', handleInputChange);
    };
  }, [setPlaceName, setPlaceAddress, setPlaceLatLang]);

  const handlePlaceClick = (place) => {
    setPlaceName(place.place_name);
    setPlaceAddress(place.road_address_name || place.address_name);
    setPlaceLatLang({ lat: place.y, lng: place.x });
    alert(`선택한 장소: ${place.place_name}`);
    handleCloseModal();
  };

  const handleKeyDown = (e, place) => {
    // Enter (13) 또는 Space (32) 키가 눌린 경우 클릭 이벤트를 실행
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Space 키의 기본 스크롤 동작을 방지
      handlePlaceClick(place);
    }
  };

  const renderPlaces = () => {
    console.log(places);
    return places.map((place, index) => (
      <li
        tabIndex={0}
        key={index}
        className={S.searchDateItem}
        onClick={() => handlePlaceClick(place)}
        onKeyDown={(e) => handleKeyDown(e, place)}
      >
        <div className={S.itemWrapper}>
          <p className="title2">{place.place_name}</p>
          <span className="caption">{place.address_name}</span>
        </div>
      </li>
    ));
  };

  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <div className={S.pagination}>
        {Array.from({ length: pagination.last }, (_, i) => (
          <a
            key={i}
            href="#"
            className={i + 1 === pagination.current ? S.on : ''}
            onClick={() => pagination.gotoPage(i + 1)}
          >
            {i + 1}
          </a>
        ))}
      </div>
    );
  };

  const handleCloseModal = () => {
    closeModal?.();
  };

  return (
    <article style={{ width: '100%', padding: 0 }} className={S.component}>
      <div className={S.searchHeader}>
        <h2 className="headline4">여행지 주소</h2>
        <button type="button" onClick={handleCloseModal}>
          <XButton aria-label="모달 나가기 버튼 이미지" />
        </button>
      </div>
      <div className={S.inputWrapper}>
        <label htmlFor="SearchAddress">
          <Search aria-label="검색 아이콘" />
        </label>
        <input
          ref={searchInputRef}
          id="SearchAddress"
          name="SearchAddress"
          type="text"
          placeholder="여행지를 검색해보세요"
        />
      </div>

      <ul id="placesList" className={S.searchDateList}>
        {renderPlaces()}
      </ul>
      <div id="pagination" className={S.pagination}>
        {renderPagination()}
      </div>
    </article>
  );
}

export default PlaceSearchModal;
