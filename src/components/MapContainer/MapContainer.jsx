import { useState, useEffect, useRef } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import AppInput2 from '../AppInput/AppInput2';
import S from './MapContainer.module.css';
import ToggleList from '@/assets/svg/toggle-list.svg?react';
import ToggleMap from '@/assets/svg/toggle-map.svg?react';
import Card from '../Card/Card';
import SearchAddr from '../SearchAddr';
import pb from '@/api/pb';
import Modal from './Modal';
import markerImageSrc from '../../assets/svg/marker.svg';

const { kakao } = window;

const MapContainer = () => {
  const location = useGeolocation();
  const [showMap, setShowMap] = useState(true);
  const [, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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
                setSelectedPost(post);
                setIsModalOpen(true);
              });
            }
          } catch (error) {
            console.error(error);
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
    setSelectedPost(null);
  };

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
            <Card />
            <SearchAddr />
          </div>
        </>
      )}
      {isModalOpen && selectedPost && (
        <Modal onClose={closeModal}>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
        </Modal>
      )}
    </div>
  );
};

export default MapContainer;
