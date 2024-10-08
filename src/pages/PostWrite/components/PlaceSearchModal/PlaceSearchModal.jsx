import { useState, useEffect, useRef } from 'react';
import usePlaceDateStore from '@/stores/usePlaceDataStore';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
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
  const [searchTerm, setSearchTerm] = useState('');
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

    const inputElement = searchInputRef.current;

    const handleInputChange = debounce(() => {
      const keyword = inputElement?.value;
      setSearchTerm(keyword);
      searchPlaces(keyword);
    }, 300);

    inputElement?.addEventListener('input', handleInputChange);

    return () => {
      inputElement?.removeEventListener('input', handleInputChange);
    };
  }, [setPlaceName, setPlaceAddress, setPlaceLatLang]);

  // esc키 클릭 시 모달창 종료
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

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

  const clearSearch = () => {
    setSearchTerm('');
    searchInputRef.current.value = '';
    setPlaces([]);
    setPagination(null);
  };

  const renderPlaces = () => {
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
    <AnimatePresence>
      <motion.article
        style={{ width: '100%', padding: 0 }}
        className={S.component}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
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
            defaultValue={searchTerm}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className={S.clearButton}
            >
              <XButton aria-label="검색어 지우기 버튼" />
            </button>
          )}
        </div>
        <ul id="placesList" className={S.searchDateList}>
          {renderPlaces()}
        </ul>
        <div id="pagination" className={S.pagination}>
          {renderPagination()}
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

export default PlaceSearchModal;
