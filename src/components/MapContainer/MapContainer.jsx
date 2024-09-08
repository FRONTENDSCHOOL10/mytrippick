import { useEffect } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import AppInput2 from '../AppInput/AppInput2';
import S from './MapContainer.module.css';

const { kakao } = window;

const MapContainer = () => {
  const location = useGeolocation();

  useEffect(() => {
    if (!location.loaded) return;

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(
        location.coordinates?.lat || 37.5665,
        location.coordinates?.lng || 126.978
      ),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // db에서 전체 리뷰 좌표를 받아서 마커 생성하는 로직 작성하기
  }, [location]);

  return (
    <div className={S.container}>
      <div className={S.searchBox}>
        <AppInput2
          label="주소 검색창"
          type="text"
          name="keyword"
          placeholder="여행지를 검색해보세요"
        />
        <button id="search-btn" className={S.searchButton}>
          Search
        </button>
      </div>
      <div id="map" className={S.map}></div>
    </div>
  );
};

export default MapContainer;
