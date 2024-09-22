import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import { throttle } from '@/utils';
import { elapsedTime } from '@/utils/elapsedTime';
import { string } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import S from './Comment.module.css';
import MoreBtn from '../MoreBtn/MoreBtn';
import { array } from 'prop-types';
import { func } from 'prop-types';

Comment.propTypes = {
  postId: string.isRequired,
  currentUser: string.isRequired,
  commentsList: array,
  setCommentsList: func,
};

function Comment({ postId, currentUser, commentsList, setCommentsList }) {
  const [commentUsers, setCommentUsers] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 가져오기

        const userMap = {};
        commentsList.forEach((item) => {
          if (item.expand?.userId) {
            userMap[item.userId] = item.expand.userId;
          }
        });

        setCommentUsers(userMap);
      } catch (error) {
        // 에러 처리
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching data:', error);
      }
    };

    const subscribeToComments = () => {
      pb.collection('comments').subscribe('*', (payload) => {
        if (payload.action === 'create' && payload.record.postId === postId) {
          setCommentsList((prev) => [...prev, payload.record]);
        }
      });
    };

    if (postId) {
      fetchData();
      subscribeToComments(); // 댓글 구독
    }

    return () => {
      pb.collection('comments').unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, [commentsList, postId, setCommentsList]);

  const handleDelete = async (commentId) => {
    try {
      await pb.collection('comments').delete(commentId);
      setCommentsList((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('댓글을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const noComment = useMemo(() => commentsList.length < 1, [commentsList]);

  const handleCommentChange = throttle((e) => {
    const value = e.target.value;
    setNewComment(value);
    setIsDisabled(value.trim().length === 0);
  }, 500);

  const handleAddComment = async () => {
    console.log('클릭!');

    const newCommentData = {
      postId,
      userId: currentUser,
      contents: newComment,
    };

    await pb.collection('comments').create(newCommentData);

    setCommentsList((prev) => [...prev, newCommentData]);
    setNewComment(''); // 입력 필드 초기화
    setIsDisabled(true); // 댓글 추가 후 버튼 비활성화
  };

  return (
    <>
      <section className={S.commentContainer}>
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
            })}
          </ul>
        )}
      </section>
      <section className={S.addComment}>
        <AppInput
          type="text"
          name="comment"
          label="댓글 입력"
          placeholder="댓글을 입력해주세요"
          onChange={handleCommentChange}
          defaultValue={newComment}
        ></AppInput>
        <CommonBtn fill disabled={isDisabled} onClick={handleAddComment}>
          등록
        </CommonBtn>
        {/* 코멘트 입력 시 버튼 활성화되는 기능 필요 */}
      </section>
    </>
  );
}

export default Comment;
