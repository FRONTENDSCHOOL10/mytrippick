import MapContainer from '@/components/MapContainer/MapContainer';
import AppHelmet from '@/components/AppHelmet/AppHelmet';

function MapSearchPage() {
  return (
    <>
      <AppHelmet title={'마이트립픽 | 내 주변 여행지 찾기'} />
      <MapContainer />
    </>
  );
}

export default MapSearchPage;
