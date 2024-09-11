import { create } from 'zustand';

const usePostPhotoFileStore = create((set) => ({
  image: null,
  imageURL: null,
  setImage: (img) => set({ image: img }),
  setImageURL: (url) => set({ imageURL: url }),
  clearImage: () => set({ image: null }),
  clearImageURL: () => set({ imageURL: null }),
}));

export default usePostPhotoFileStore;
