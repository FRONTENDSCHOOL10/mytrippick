import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import AppInput from '@/components/AppInput/AppInput';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import UserProfile from '@/components/UserProfile/UserProfile';
import useGlobalStore from '@/stores/useGlobalStore';
import { elapsedTime } from '@/utils/elapsedTime';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import MoreBtn from './components/MoreBtn';
import PostText from './components/PostText';
import S from './PostDetail.module.css';

// 해야할 일
// 1. 수정하기/삭제하기 동작 기능까지 설정할 것
// 2. 댓글 수정/삭제

function PostDetail() {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [commentUsers, setCommentUsers] = useState([]);
  const [, setError] = useState(null);

  const { initializeUser, currentUserId } = useGlobalStore();

  const { postId } = useParams();

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 가져오기
        const postData = await pb.collection('posts').getOne(postId);
        const userId = postData.userId;
        const userData = await pb.collection('users').getOne(userId);
        const comments = await pb.collection('comments').getList(1, 50, {
          filter: `postId = "${postId}"`,
        });

        // 상태 업데이트 전에 변경된 데이터인지 확인
        setPostData((prevPostData) => {
          if (JSON.stringify(prevPostData) !== JSON.stringify(postData)) {
            return postData;
          }
          return prevPostData;
        });

        setUserData((prevUserData) => {
          if (JSON.stringify(prevUserData) !== JSON.stringify(userData)) {
            return userData;
          }
          return prevUserData;
        });

        setCommentList((prevComments) => {
          if (JSON.stringify(prevComments) !== JSON.stringify(comments.items)) {
            return comments.items;
          }
          return prevComments;
        });

        // 코멘트 유저 id 수집
        const commentUserIds = [
          ...new Set(commentList.map((item) => item.userId)),
        ];

        // 코멘트 유저 정보 가져오기
        const commentUserPromise = commentUserIds.map((item) =>
          fetchUserById(item)
        );
        const commentUserResults = await Promise.all(commentUserPromise);

        // 유저 정보를 객체로 설정
        const userMap = {};
        commentUserResults.forEach((user) => {
          userMap[user.id] = user; // userId를 키로 하는 매핑
        });

        setCommentUsers(userMap);
      } catch (error) {
        // 에러 처리
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserById = async (id) => {
      const user = await pb.collection('users').getOne(id);

      return user;
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const profileImage = getPbImageURL(userData, 'userProfile');
  const postImage = getPbImageURL(postData);

  const noComment = commentList < 1;

  let isDisabled = true;

  const handleComment = async () => {
    const commentInput = document.querySelector('.input');
    isDisabled = commentInput.value === '';
    console.log('클릭!');

    const commentData = {
      contents: `${commentInput.value}`,
      userId: `${currentUserId}`,
      postId: `${postId}`,
    };

    const record = await pb.collection('comments').create(commentData);

    commentInput.value = '';
  };

  return (
    <>
      <section className={S.photoBox}>
        <div role="group" className={S.onPhoto}>
          <UserProfile avatarUrl={profileImage} userName={userData.nickName} />

          {currentUserId === postData.userId ? <MoreBtn /> : ''}
        </div>
        <img src={postImage} alt="" />
      </section>
      <section className={S.postInfo}>
        <div role="group" className={`caption ${S.placeInfo}`}>
          <FilledMarker /> {postData.placePosition} • {postData.category}
        </div>
        <div role="group" className={S.toggleBox}>
          <ToggleBtn />
          <ToggleBtn bookmark />
        </div>
      </section>
      <section className={S.postText}>
        <PostText>{postData.contents}</PostText>
      </section>
      <section className={S.commentContainer}>
        <span>댓글 {commentList.length}</span>
        {noComment ? (
          <p className={S.noComment}>첫 댓글을 남겨보세요.</p>
        ) : (
          <ul className={S.commentList}>
            {commentList.map((item) => {
              const user = commentUsers[item.userId];

              if (user) {
                return (
                  <li key={item.id}>
                    <img src={getPbImageURL(user, 'userProfile')} alt="" />
                    <div role="group" className={S.comment}>
                      <div role="group" className={S.nickName}>
                        <p>{user.nickName}</p>
                        <MoreBtn small />
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
          name="comment"
          label="댓글 입력"
          placeholder="댓글을 입력해주세요"
        ></AppInput>
        <CommonBtn fill disabled={isDisabled} onClick={handleComment}>
          등록
        </CommonBtn>
        {/* 코멘트 입력 시 버튼 활성화되는 기능 필요 */}
      </section>
    </>
  );
}

export default PostDetail;
