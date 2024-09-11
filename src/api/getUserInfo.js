import pb from './pb';

export async function getUserInfo(userId) {
  try {
    console.log('Fetching user with ID:', userId);
    const user = await pb.collection('users').getOne(userId); // userId를 사용하여 사용자 정보 가져오기
    return user;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', JSON.stringify(error)); // 에러 객체 전체 출력
    throw error;
  }
}
