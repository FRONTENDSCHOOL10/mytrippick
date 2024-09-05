import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  isFocusTrapped: false,
  setIsFocusTrapped: (isFocusTrapped) => set({ isFocusTrapped }),

  isLoggedIn: false,
  profileImage: '',
  nickname: '',

  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : '');
    set({ isLoggedIn });
  },
  setProfileImage: (profileImage) => set({ profileImage }),
  setNickname: (nickname) => set({ nickname }),

  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      set({
        isLoggedIn: true,
        profileImage: './../../favicon.svg', //임시
        nickname: '닉네임',
      });
    }
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({
      isLoggedIn: false,
      profileImage: '',
      nickname: '',
    });
  },
  isToggled: false,
  setIsToggled: (isToggled) => set({ isToggled }),
}));

export default useGlobalStore;
