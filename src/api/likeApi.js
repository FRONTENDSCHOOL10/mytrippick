import pb from './pb';

// 좋아요 수 가져오기
export async function fetchLikes(postId) {
  try {
    // 게시글 데이터를 ID로 조회하여 likedNum을 반환
    const post = await pb.collection('posts').getOne(postId);
    return post.likedNum || 0; // likedNum이 없으면 0으로 반환
  } catch (error) {
    console.error('좋아요 수 가져오기 실패:', error);
    return 0;
  }
}

// 좋아요 상태 확인 (해당 사용자가 게시글을 좋아요 했는지 여부)
export async function checkUserLike(userId, postId) {
  try {
    const record = await pb
      .collection('likes')
      .getFirstListItem(`userId="${userId}" && postId="${postId}"`);
    return !!record; // 좋아요 상태가 있으면 true, 없으면 false
  } catch (error) {
    console.error('좋아요 상태 확인 실패:', error);
    return false;
  }
}

// 좋아요 추가 (좋아요 기록 추가 + 게시글 likedNum 필드 업데이트)
export async function addLike(userId, postId) {
  try {
    // 좋아요 기록 추가
    await pb.collection('likes').create({
      userId,
      postId,
    });

    // 게시글의 좋아요 수 업데이트
    const post = await pb.collection('posts').getOne(postId);
    const updatedLikedNum = (post.likedNum || 0) + 1;
    await pb.collection('posts').update(postId, { likedNum: updatedLikedNum });

    return updatedLikedNum; // 업데이트된 좋아요 수 반환
  } catch (error) {
    console.error('좋아요 추가 실패:', error);
    throw error;
  }
}

// 좋아요 취소 (좋아요 기록 삭제 + 게시글 likedNum 필드 업데이트)
export async function removeLike(userId, postId) {
  try {
    // 좋아요 기록 삭제
    const likeRecord = await pb
      .collection('likes')
      .getFirstListItem(`userId="${userId}" && postId="${postId}"`);
    if (likeRecord) {
      await pb.collection('likes').delete(likeRecord.id);
    }

    // 게시글의 좋아요 수 업데이트
    const post = await pb.collection('posts').getOne(postId);
    const updatedLikedNum = Math.max((post.likedNum || 0) - 1, 0);
    await pb.collection('posts').update(postId, { likedNum: updatedLikedNum });

    return updatedLikedNum; // 업데이트된 좋아요 수 반환
  } catch (error) {
    console.error('좋아요 취소 실패:', error);
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
