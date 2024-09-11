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

    const profileImageUrl = authData.record.userProfile
      ? `${pb.baseUrl}/api/files/${authData.record.collectionId}/${authData.record.id}/${authData.record.userProfile}`
      : './../../favicon.svg';

    setProfileImage(profileImageUrl);

    console.log(authData.record.userProfile);
    setNickname(authData.record.nickName || '닉네임');

    return authData;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}
