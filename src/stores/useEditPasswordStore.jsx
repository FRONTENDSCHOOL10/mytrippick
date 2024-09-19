import { create } from 'zustand';

const useEditPasswordStore = create((set) => ({
  beforePassword: null,
  changePassword: null,
  changePasswordConfirm: null,
  changePasswordMessage:
    '숫자, 특수문자를 최소 1가지 이상 포함한 대소문자 구분 없는 영문 8~15자',
  changePasswordConfirmMessage: null,
  isChangePassword: false,
  isChangePasswordConfirm: false,
  setBeforePassword: (oldPassword) => set({ beforePassword: oldPassword }),
  setChangePassword: (newPassword) => set({ changePassword: newPassword }),
  setChangePasswordConfirm: (newPassword) =>
    set({
      changePasswordConfirm: newPassword,
    }),
  setChangePasswordMessage: (newMessage) =>
    set({
      changePasswordMessage: newMessage,
    }),
  setChangePasswordConfirmMessage: (newMessage) =>
    set({
      changePasswordConfirmMessage: newMessage,
    }),
  setIsChangePassword: (isChanged) => set({ isChangePassword: isChanged }),
  setIsChangePasswordConfirm: (isChanged) =>
    set({
      isChangePasswordConfirm: isChanged,
    }),
}));
export default useEditPasswordStore;
