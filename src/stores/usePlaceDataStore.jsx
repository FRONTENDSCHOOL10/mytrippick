import { create } from 'zustand';

const usePlaceDateStore = create((set) => ({
  placeName: null,
  placeAddress: null,
  placeLatLong: null,
  setPlaceName: (newPlace) => set({ placeName: newPlace }),
  clearPlaceName: () => set({ placeName: null }),
  setPlaceAddress: (newPlaceAddress) => set({ placeAddress: newPlaceAddress }),
  clearPlaceAddress: () => set({ placeAddress: null }),
  setPlaceLatLang: (newPlaceLatLang) => set({ placeLatLong: newPlaceLatLang }),
  clearPlaceLatLang: () => set({ placeLatLong: null }),
}));

export default usePlaceDateStore;
