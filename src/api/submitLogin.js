import pb from './pb';
import useGlobalStore from '@/stores/useGlobalStore';

export async function submitLogin(collectionName, datas) {
  try {
    const authData = await pb
      .collection(collectionName)
      .authWithPassword(datas.email, datas.password);

    const { setIsLoggedIn, setProfileImage, setNickname } =
      useGlobalStore.getState();

    setIsLoggedIn(true);
    setProfileImage(authData.record.profileImage || './../../favicon.svg');
    setNickname(authData.record.nickname || '닉네임');

    return authData;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}
