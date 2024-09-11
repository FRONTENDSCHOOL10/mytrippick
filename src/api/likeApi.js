import pb from './pb';
import { CreateDatas } from '@/api/CreateDatas';

// 좋아요 수 가져오기
export async function fetchLikes(postId) {
  try {
    const post = await pb.collection('posts').getOne(postId);
    return post?.likedNum || 0;
  } catch (error) {
    console.error(`좋아요 수 가져오기 실패 (postId: ${postId}):`, error);
    return 0;
  }
}

// 좋아요 상태 확인 (해당 사용자가 게시글을 좋아요 했는지 여부)
export async function checkUserLike(userId, postId) {
  if (!userId || !postId) {
    console.error(`잘못된 매개변수: userId (${userId}), postId (${postId})`);
    return false;
  }
  try {
    const record = await pb
      .collection('likes')
      .getFirstListItem(`userId="${userId}" && postId="${postId}"`);
    return !!record;
  } catch (error) {
    console.error(
      `좋아요 상태 확인 실패 (userId: ${userId}, postId: ${postId}):`,
      error
    );
    return false;
  }
}

// 좋아요 추가 (좋아요 기록 추가 + 게시글 likedNum 필드 업데이트)
export async function addLike(userId, postId, currentLikedNum) {
  try {
    const [updatedPost] = await Promise.all([
      pb
        .collection('posts')
        .update(postId, { likedNum: (currentLikedNum || 0) + 1 }),
      CreateDatas('likes', { userId, postId }), // 좋아요 기록 추가
    ]);

    return updatedPost.likedNum; // 업데이트된 좋아요 수 반환
  } catch (error) {
    console.error(
      `좋아요 추가 실패 (userId: ${userId}, postId: ${postId}):`,
      error
    );
    throw error;
  }
}

// 좋아요 취소 (좋아요 기록 삭제 + 게시글 likedNum 필드 업데이트)
export async function removeLike(userId, postId, currentLikedNum) {
  try {
    const likeRecord = await pb
      .collection('likes')
      .getFirstListItem(`userId="${userId}" && postId="${postId}"`);

    if (likeRecord) {
      const [updatedPost] = await Promise.all([
        pb.collection('likes').delete(likeRecord.id), // 좋아요 기록 삭제
        pb.collection('posts').update(postId, {
          likedNum: Math.max((currentLikedNum || 0) - 1, 0),
        }), // 좋아요 수 업데이트
      ]);

      return updatedPost.likedNum;
    }

    return currentLikedNum; // 좋아요 기록이 없으면 기존 좋아요 수 반환
  } catch (error) {
    console.error(
      `좋아요 취소 실패 (userId: ${userId}, postId: ${postId}):`,
      error
    );
    throw error;
  }
}

// 실시간 좋아요 상태 업데이트
export function subscribeToLikes(postId, callback) {
  pb.collection('likes').subscribe(postId, function (e) {
    callback(e);
  });

  return () => {
    pb.collection('likes').unsubscribe(postId);
  };
}
