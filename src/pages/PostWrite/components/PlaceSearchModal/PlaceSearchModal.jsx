import { useEffect, useRef } from 'react';
import S from './PlaceSearchModal.module.css';

const { kakao } = window;

function PlaceSearchModal() {
  const placesListRef = useRef(null); // 검색 결과 리스트 표시할 요소
  const paginationRef = useRef(null); // 페이지네이션 표시할 요소

  useEffect(() => {
    if (!kakao || !kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    if (!placesListRef.current || !paginationRef.current) return;

    const ps = new kakao.maps.services.Places();

    const searchPlaces = () => {
      const keyword = document.getElementById('keyword').value;
      if (!keyword.trim()) {
        alert('키워드를 입력해주세요!');
        return;
      }
      ps.keywordSearch(keyword, placesSearchCB); // 장소 검색
    };

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data); // 장소 표시
        displayPagination(pagination); // 페이지네이션 표시
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    };

    const displayPlaces = (places) => {
      // 리스트 초기화
      placesListRef.current.innerHTML = '';

      const bounds = new kakao.maps.LatLngBounds();

      places.forEach((place, i) => {
        const placePosition = new kakao.maps.LatLng(place.y, place.x);

        // 리스트에 장소 정보 추가
        const itemEl = document.createElement('li');
        itemEl.className = 'item';
        itemEl.innerHTML = `
          <span class="markerbg marker_${i + 1}"></span>
          <div class="info">
            <h5>${place.place_name}</h5>
            <span>${place.road_address_name || place.address_name}</span>
            <span class="tel">${place.phone || ''}</span>
          </div>
        `;

        placesListRef.current.appendChild(itemEl);

        bounds.extend(placePosition);
      });
    };

    const displayPagination = (pagination) => {
      paginationRef.current.innerHTML = '';
      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = () => pagination.gotoPage(i);
        }

        paginationRef.current.appendChild(el);
      }
    };

    document.getElementById('searchButton').onclick = searchPlaces;
  }, []);

  return (
    <div>
      <input id="keyword" type="text" placeholder="검색할 장소를 입력하세요" />
      <button id="searchButton">검색</button>

      <div id="menu_wrap" style={{ width: '100%', height: '400px' }}>
        <ul id="placesList" ref={placesListRef} className={S.placesList}></ul>
        <div id="pagination" ref={paginationRef}></div>
      </div>
    </div>
  );
}

export default PlaceSearchModal;
