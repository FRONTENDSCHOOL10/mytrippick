import pb from './pb';
import useGlobalStore from '@/stores/useGlobalStore';

export async function submitLogin(collectionName, datas) {
  try {
    const authData = await pb
      .collection(collectionName)
      .authWithPassword(datas.email, datas.password);

    const { setIsLoggedIn } = useGlobalStore.getState();

    setIsLoggedIn(true);

    const profileImageUrl = `${pb.baseUrl}/api/files/${authData.record.collectionId}/${authData.record.id}/${authData.record.userProfile}`;
    const nickname = authData.record.nickName || '닉네임';

    localStorage.setItem('profileImage', profileImageUrl);
    localStorage.setItem('nickname', nickname);

    return authData;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}
