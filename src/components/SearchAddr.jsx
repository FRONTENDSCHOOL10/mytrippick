import { useState, useEffect } from 'react';

const SearchAddr = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [savedPlace, setSavedPlace] = useState(null);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();

    if (searchQuery) {
      ps.keywordSearch(searchQuery, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
        } else {
          setPlaces([]);
        }
      });
    }
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
        placeholder="검색어를 입력하세요"
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
