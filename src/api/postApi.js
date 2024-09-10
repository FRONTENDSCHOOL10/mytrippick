import pb from './pb';

// 게시글 목록 가져오기
export async function fetchPosts() {
  try {
    const posts = await pb.collection('posts').getFullList({
      sort: '-likedNum', // 좋아요 수 기준 내림차순 정렬
    });
    return posts;
  } catch (error) {
    console.error('게시글 목록 가져오기 실패:', error);
    throw error;
  }
}
