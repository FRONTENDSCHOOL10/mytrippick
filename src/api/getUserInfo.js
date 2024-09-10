import pb from './pb';

export async function getUserInfo(userId) {
  try {
    const user = await pb.collection('users').getOne(userId);
    return user;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
}
