import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import { elapsedTime } from '@/utils/elapsedTime';
import { string, array, func } from 'prop-types';
import S from './Comment.module.css';
import MoreBtn from '../MoreBtn/MoreBtn';
import useGlobalStore from '@/stores/useGlobalStore';

Comment.propTypes = {
  postId: string.isRequired,
  currentUser: string.isRequired,
  commentsList: array,
  setCommentsList: func,
};

function Comment({ postId, currentUser, commentsList, setCommentsList }) {
  const [commentUsers, setCommentUsers] = useState({});
  const [newComment, setNewComment] = useState('');
  const [, setError] = useState(null);
  const subscriptionRef = useRef(null);

  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  const fetchCommentUsers = useCallback(async () => {
    try {
      const userMap = {};
      for (const item of commentsList) {
        if (item.expand?.userId) {
          userMap[item.userId] = item.expand.userId;
        } else if (!userMap[item.userId]) {
          const user = await pb.collection('users').getOne(item.userId);
          userMap[item.userId] = user;
        }
      }
      setCommentUsers(userMap);
    } catch (error) {
      setError('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching user data:', error);
    }
  }, [commentsList]);

  useEffect(() => {
    if (postId) {
      fetchCommentUsers();

      if (!subscriptionRef.current) {
        subscriptionRef.current = pb
          .collection('comments')
          .subscribe('*', async (payload) => {
            if (
              payload.action === 'create' &&
              payload.record.postId === postId
            ) {
              setCommentsList((prev) => {
                // 중복 추가 방지
                if (prev.some((comment) => comment.id === payload.record.id)) {
                  return prev;
                }
                return [...prev, payload.record];
              });
              const user = await pb
                .collection('users')
                .getOne(payload.record.userId);
              setCommentUsers((prev) => ({
                ...prev,
                [payload.record.userId]: user,
              }));
            } else if (payload.action === 'delete') {
              setCommentsList((prev) =>
                prev.filter((comment) => comment.id !== payload.record.id)
              );
            }
          });
      }

      return () => {
        if (subscriptionRef.current) {
          pb.collection('comments').unsubscribe(subscriptionRef.current);
          subscriptionRef.current = null;
        }
      };
    }
  }, [postId, setCommentsList, fetchCommentUsers]);

  const handleDelete = async (commentId) => {
    try {
      await pb.collection('comments').delete(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('댓글을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const noComment = useMemo(() => commentsList.length < 1, [commentsList]);

  const handleCommentChange = useCallback((e) => {
    const value = e.target.value;
    setNewComment(value);
  }, []);

  const handleAddComment = useCallback(
    async (e) => {
      e.preventDefault();

      if (!newComment.trim()) return;

      const newCommentData = {
        postId,
        userId: currentUser,
        contents: newComment,
      };

      try {
        const createdComment = await pb
          .collection('comments')
          .create(newCommentData);
        setNewComment('');
        // 로컬 상태 업데이트 (서버 구독과 중복되지 않도록 주의)
        setCommentsList((prev) => {
          if (prev.some((comment) => comment.id === createdComment.id)) {
            return prev;
          }
          return [...prev, createdComment];
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        setError('댓글을 추가하는 중 오류가 발생했습니다.');
      }
    },
    [newComment, postId, currentUser, setCommentsList]
  );

  return (
    <>
      <section className={S.commentContainer}>
        {/* 변경: commentsList.length를 사용하여 실시간으로 댓글 개수 반영 */}
        <span>댓글 {commentsList.length}</span>
        {noComment ? (
          <p className={S.noComment}>첫 댓글을 남겨보세요.</p>
        ) : (
          <ul className={S.commentList}>
            {commentsList.map((item) => {
              const user = commentUsers[item.userId];

              if (user) {
                return (
                  <li key={item.id}>
                    <img src={getPbImageURL(user, 'userProfile')} alt="" />
                    <div role="group" className={S.comment}>
                      <div role="group" className={S.nickName}>
                        <p>{user.nickName}</p>
                        {user.id === currentUser ? (
                          <MoreBtn
                            small
                            onClickDelete={() => handleDelete(item.id)}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <p className="body3">{item.contents}</p>
                      <span className={S.commentDate}>
                        {elapsedTime(item.created)}
                      </span>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
      </section>
      <form className={S.addComment}>
        <AppInput
          type="text"
          name="comment"
          label="댓글 입력"
          placeholder={
            isLoggedIn
              ? '댓글을 입력해주세요'
              : '로그인 후 댓글을 입력해주세요.'
          }
          onChange={handleCommentChange}
          value={newComment}
          disabled={!isLoggedIn}
        />
        <CommonBtn
          submit
          fill
          disabled={!newComment.trim() || !isLoggedIn}
          onClick={handleAddComment}
        >
          등록
        </CommonBtn>
      </form>
    </>
  );
}

export default Comment;
