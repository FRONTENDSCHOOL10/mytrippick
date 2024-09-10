import pb from './pb';

// 좋아요 순으로 정렬된 게시글 목록 가져오기
export async function fetchPostsByLikes() {
  try {
    const posts = await pb.collection('posts').getFullList({
      sort: '-likedNum', // 좋아요 수 기준 내림차순 정렬
      autoCancel: false,
    });
    return posts;
  } catch (error) {
    console.error('좋아요 순 게시글 목록 가져오기 실패:', error);
    throw error;
  }
}

// 최신 등록된 게시글 목록 가져오기
export async function fetchLatestPosts() {
  try {
    const posts = await pb.collection('posts').getFullList({
      sort: '-created', // 최신순으로 정렬
    });
    return posts;
  } catch (error) {
    console.error('최신 게시글 목록 가져오기 실패:', error);
    throw error;
  }
}
