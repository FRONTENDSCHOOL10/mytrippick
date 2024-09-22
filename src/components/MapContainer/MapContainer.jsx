import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import PlaceSearch from '../AppInput/PlaceSearch';
import S from './MapContainer.module.css';
import ToggleList from '@/assets/svg/toggle-list.svg?react';
import ToggleMap from '@/assets/svg/toggle-map.svg?react';
import pb from '@/api/pb';
import Modal from './Modal';
import markerImageSrc from '../../assets/svg/marker.svg';
import { getSortedPostIdsByDistance } from '@/api/getDistance';
import Card from '../Card/Card';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

const { kakao } = window;

const MapContainer = () => {
  const location = useGeolocation();
  const [showMap, setShowMap] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sortedPostIds, setSortedPostIds] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
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
      setIsFetching(true);
      try {
        const records = await pb.collection('posts').getFullList();
        const filteredPosts = records.filter((post) => {
          const parsedLocation = JSON.parse(post.placeLatLong || '{}');
          return parsedLocation.lat && parsedLocation.lng;
        });
        setPosts(filteredPosts);

        const markerImage = new kakao.maps.MarkerImage(
          markerImageSrc,
          new kakao.maps.Size(16, 16)
        );

        await Promise.all(
          filteredPosts.map((post) => {
            const parsedLocation = JSON.parse(post.placeLatLong);
            const markerPosition = new kakao.maps.LatLng(
              parsedLocation.lat,
              parsedLocation.lng
            );
            const marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(mapRef.current);
            kakao.maps.event.addListener(marker, 'click', () => {
              setSelectedPostId(post.id);
              setIsModalOpen(true);
            });
          })
        );

        const searchLocation = {
          lat: location.coordinates?.lat || 37.5665,
          lng: location.coordinates?.lng || 126.978,
        };
        const sortedIds = getSortedPostIdsByDistance(
          filteredPosts,
          searchLocation
        );
        setSortedPostIds(sortedIds);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
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

        const searchLocation = {
          lat: parseFloat(firstPlace.y),
          lng: parseFloat(firstPlace.x),
        };
        const sortedIds = getSortedPostIdsByDistance(posts, searchLocation);
        setSortedPostIds(sortedIds);
      }
    });
  };

  const toggleView = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPostId(null);
  }, []);

  return (
    <div className={S.container}>
      {showMap ? (
        <>
          <div className={S.searchBox}>
            <PlaceSearch onSearch={handleSearch} />
          </div>
          <div className={S.toggleBox} onClick={toggleView}>
            <div className={S.circleBox}>
              <ToggleList />
            </div>
          </div>
          <div id="map" className={S.map}></div>
          {isModalOpen && selectedPostId && (
            <Modal id={selectedPostId} onClose={closeModal} />
          )}
        </>
      ) : (
        <>
          <div className={S.toggleBox} onClick={toggleView}>
            <div className={S.circleBox}>
              <ToggleMap />
            </div>
          </div>
          {isFetching ? (
            <AppSpinner />
          ) : (
            <section className={S.listView}>
              <div className={S.cardList}>
                {sortedPostIds.map((postId, idx) => {
                  const postData = posts.find((post) => post.id === postId);
                  if (!postData) return null;
                  return (
                    <Fragment key={idx}>
                      <Card
                        type="post"
                        id={postData.id}
                        postId={postData.id}
                        photo={postData.photo}
                        collectionId={postData.collectionId}
                        likedNum={postData.likedNum || 0}
                        placeName={postData.placeName}
                        placePosition={postData.placePosition}
                        userId={postData.userId}
                      />
                    </Fragment>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default MapContainer;
