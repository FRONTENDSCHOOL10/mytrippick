import MapContainer from '@/components/MapContainer/MapContainer';
import AppHelmet from '@/components/AppHelmet/AppHelmet';

function MapSearchPage() {
  return (
    <>
      <AppHelmet title={'마이트립픽 | 지도 검색'} />
      <MapContainer />
    </>
  );
}

export default MapSearchPage;
