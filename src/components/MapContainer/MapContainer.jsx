import { useState, useEffect } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import AppInput2 from '../AppInput/AppInput2';
import S from './MapContainer.module.css';
import ToggleList from '@/assets/svg/toggle-list.svg?react';
import ToggleMap from '@/assets/svg/toggle-map.svg?react';
import Card from '../Card/Card';
import SearchAddr from '../SearchAddr';

const { kakao } = window;

const MapContainer = () => {
  const location = useGeolocation();
  const [showMap, setShowMap] = useState(true); // 맵과 리스트 페이지 전환을 위한 상태

  let map;

  useEffect(() => {
    if (!location.loaded || !showMap) return;

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(
        location.coordinates?.lat || 37.5665,
        location.coordinates?.lng || 126.978
      ),
      level: 3,
    };

    map = new kakao.maps.Map(mapContainer, mapOption);
  }, [location, showMap]);

  const handleSearch = (keyword) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        const firstPlace = data[0];
        const newCenter = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
        map.setCenter(newCenter);
        // 마커 추가 로직
      }
    });
  };

  const toggleView = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  return (
    <div className={S.container}>
      {showMap ? (
        <>
          <div className={S.searchBox}>
            <AppInput2
              label="주소 검색창"
              type="text"
              name="주소 검색창"
              placeholder="여행지를 검색해보세요"
              onSearch={handleSearch}
            />
          </div>
          <div className={S.toggleBox} onClick={toggleView}>
            <div className={S.circleBox}>
              <ToggleList />
            </div>
          </div>
          <div id="map" className={S.map}></div>
        </>
      ) : (
        <>
          <div className={S.toggleBox} onClick={toggleView}>
            <div className={S.circleBox}>
              <ToggleMap />
            </div>
          </div>
          <div className={S.emptyPage}>
            <Card />
            <SearchAddr />
          </div>
        </>
      )}
    </div>
  );
};

export default MapContainer;
