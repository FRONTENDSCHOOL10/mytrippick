import { useState, useEffect, useRef, useCallback } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import AppInput2 from '../AppInput/AppInput2';
import S from './MapContainer.module.css';
import ToggleList from '@/assets/svg/toggle-list.svg?react';
import ToggleMap from '@/assets/svg/toggle-map.svg?react';
import pb from '@/api/pb';
import Modal from './Modal';
import markerImageSrc from '../../assets/svg/marker.svg';

const { kakao } = window;

const MapContainer = () => {
  const location = useGeolocation();
  const [showMap, setShowMap] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mapRef = useRef(null);

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

    const createdMap = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = createdMap;

    const fetchPosts = async () => {
      const records = await pb.collection('posts').getFullList();
      setPosts(records);

      const markerImage = new kakao.maps.MarkerImage(
        markerImageSrc,
        new kakao.maps.Size(16, 16)
      );

      records.forEach((post) => {
        if (post.placeLatLong) {
          try {
            const parsedLocation = JSON.parse(post.placeLatLong);

            if (parsedLocation.lat && parsedLocation.lng) {
              const markerPosition = new kakao.maps.LatLng(
                parsedLocation.lat,
                parsedLocation.lng
              );
              const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });

              marker.setMap(createdMap);

              kakao.maps.event.addListener(marker, 'click', () => {
                console.log('Marker clicked:', post.id); // 마커 클릭 시 로그 출력
                setSelectedPostId(post.id); // post의 id를 저장
                setIsModalOpen(true);
              });
            }
          } catch (error) {
            console.error(
              'Invalid JSON format for placeLatLong:',
              post.placeLatLong
            );
          }
        }
      });
    };

    fetchPosts();
  }, [location, showMap]);

  const handleSearch = (keyword) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        const firstPlace = data[0];
        const newCenter = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
        mapRef.current.setCenter(newCenter);
      }
    });
  };

  const toggleView = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  // 모달 외부를 클릭했을 때 모달을 닫는 핸들러
  const handleClickOutside = useCallback(
    (event) => {
      if (
        isModalOpen &&
        !document.querySelector(`.${S.modalContent}`).contains(event.target)
      ) {
        closeModal();
      }
    },
    [isModalOpen, closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, handleClickOutside]);

  return (
    <div className={S.container}>
      {showMap ? (
        <>
          <div className={S.searchBox}>
            <AppInput2 onSearch={handleSearch} />
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
            {/* 필요에 따라 리스트 형태로 다른 콘텐츠 표시 가능 */}
          </div>
        </>
      )}
      {isModalOpen && selectedPostId && (
        <Modal id={selectedPostId} onClose={closeModal} />
      )}
    </div>
  );
};

export default MapContainer;
