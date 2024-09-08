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

    const ps = new kakao.maps.services.Places();

    const searchPlaces = (keyword) => {
      if (!keyword) return;

      ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    };

    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        );
        infowindow.open(map, marker);
      });
    };

    document.getElementById('search-btn').addEventListener('click', () => {
      const keyword = document.getElementById('keyword').value;
      searchPlaces(keyword);
    });
  }, [location]);

  return (
    <div className={S.container}>
      <div className={S.searchBox}>
        <AppInput2
          label='주소 검색창'
          type="text"
          name="??"
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
