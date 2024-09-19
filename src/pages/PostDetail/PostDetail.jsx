import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import AppInput from '@/components/AppInput/AppInput';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import UserProfile from '@/components/UserProfile/UserProfile';
import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import MoreBtn from './components/MoreBtn';
import PostText from './components/PostText';
import S from './PostDetail.module.css';
import Comment from './components/Comment';

// 해야할 일
// 1. 수정하기/삭제하기 동작 기능까지 설정할 것
// 2. 댓글 수정/삭제

function PostDetail() {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

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

        setPostData(postData);
        setUserData(userData);
      } catch (error) {
        // 에러 처리
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching data:', error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const profileImage = getPbImageURL(userData, 'userProfile');
  const postImage = getPbImageURL(postData);

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
      <PostText>{postData.contents}</PostText>
      <Comment postId={postId} currentUser={currentUserId} />
    </>
  );
}

export default PostDetail;
