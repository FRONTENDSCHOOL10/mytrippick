export const calculateDistance = (location1, location2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(location2.lat - location1.lat);
  const dLng = toRad(location2.lng - location1.lng);
  const lat1 = toRad(location1.lat);
  const lat2 = toRad(location2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const parseLatLng = (placeLatLong) => {
  try {
    const parsed = JSON.parse(placeLatLong);
    return { lat: parsed.lat, lng: parsed.lng };
  } catch (error) {
    console.error('Error parsing placeLatLong:', error);
    return { lat: null, lng: null };
  }
};

export const getSortedPostIdsByDistance = (posts, searchLocation) => {
  return posts
    .map((post) => {
      const { lat, lng } = parseLatLng(post.placeLatLong);
      const distance = calculateDistance(searchLocation, { lat, lng });
      return { id: post.id, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .map((post) => post.id);
};
