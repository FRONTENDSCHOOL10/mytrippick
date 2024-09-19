import { create } from 'zustand';

const useModalStore = create((set) => ({
  showModal: false,
  setShowModal: (value) => set({ showModal: value }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
}));

export default useModalStore;
