import { create } from 'zustand';

const usePostPhotoFileStore = create((set) => ({
  image: null,
  imageURL: null,
  userImage: null,
  userImageURL: null,
  setImage: (img) => set({ image: img }),
  setImageURL: (url) => set({ imageURL: url }),
  setUserImage: (userImg) => set({ userImage: userImg }),
  setUserImageURL: (userImgUrl) => set({ userImageURL: userImgUrl }),
  clearImage: () => set({ image: null }),
  clearImageURL: () => set({ imageURL: null }),
  clearUserImage: () => set({ userImage: null }),
  clearUserImageURL: () => set({ userImageURL: null }),
}));

export default usePostPhotoFileStore;
