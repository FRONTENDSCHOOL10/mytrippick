import { create } from 'zustand';

const usePostDateStore = create((set) => ({
  date: null,
  setDate: (newDate) => set({ date: newDate }),
  clearDate: () => set({ date: null }),
}));

export default usePostDateStore;
