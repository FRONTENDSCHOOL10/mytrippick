import React, { useState, useEffect } from 'react';

const SearchAddr = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [savedPlace, setSavedPlace] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=09a47c8b3f46c132c2f44a8bed7965cb&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        const ps = new window.kakao.maps.services.Places();

        if (searchQuery) {
          ps.keywordSearch(searchQuery, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setPlaces(data);
            }
          });
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleSave = () => {
    if (selectedPlace) {
      setSavedPlace(selectedPlace);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="?"
      />
      <ul>
        {places.map((place) => (
          <li key={place.id} onClick={() => handlePlaceSelect(place)}>
            {place.place_name} - {place.address_name}
          </li>
        ))}
      </ul>
      {selectedPlace && (
        <div>
          <p>{selectedPlace.place_name}</p>
          <p>{selectedPlace.address_name}</p>
          <button onClick={handleSave}>좌표보기</button>
        </div>
      )}
      {savedPlace && (
        <div>
          <p>지점명: {savedPlace.place_name}</p>
          <p>주소지: {savedPlace.address_name}</p>
          <p>위도: {savedPlace.y}</p>
          <p>경도: {savedPlace.x}</p>
        </div>
      )}
    </div>
  );
};

export default SearchAddr;
