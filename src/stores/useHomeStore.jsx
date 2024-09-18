import { create } from "zustand";

const useHomeStore = create((set) => ({
  page: 1,
  setPage: (page) => set({ page }),

  selectedCategory: "전체",
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  postCardList: [],
  setPostCardList: (postCardList) => set({ postCardList }),

}));

export default useHomeStore;
