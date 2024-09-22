import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import UserProfile from '@/components/UserProfile/UserProfile';
import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './components/Comment/Comment';
import MoreBtn from './components/MoreBtn/MoreBtn';
import PostText from './components/PostText/PostText';
import S from './PostDetail.module.css';
import { useNavigate } from 'react-router-dom';

// 해야할 일
// 1. 토글 버튼 상태 고민...

export function Component() {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [commentsList, setCommentsList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [, setError] = useState(null);

  const { initializeUser, currentUserId } = useGlobalStore();
  // 좋아요/북마크에 아래 전역 상태 변경 추가?
  // const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  // const setLikedPostIds = useGlobalStore((state) => state.setLikedPostIds);
  // const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  // const setBookmarkedPostIds = useGlobalStore(
  //   (state) => state.setBookmarkedPostIds
  // );

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 가져오기
        const postData = await pb.collection('posts').getOne(postId);
        const userId = postData.userId;
        const userData = await pb.collection('users').getOne(userId);

        setPostData(postData);
        setUserData(userData);

        const comments = await pb.collection('comments').getFullList({
          filter: `postId = "${postId}"`,
          expand: 'userId',
        });

        setCommentsList(comments);
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

  const handleEdit = () => {
    navigate(`/posts/${postId}/postedit`);
  };

  const handleDelete = async () => {
    try {
      // 1. 해당 게시글의 모든 댓글 삭제
      for (const comment of commentsList) {
        await pb.collection('comments').delete(comment.id);
      }

      // 2. 게시글 삭제
      await pb.collection('posts').delete(postId);

      // 3. 마이페이지로 이동
      navigate('/mypage');
    } catch (error) {
      console.error('Error deleting post and comments:', error);
      setError('게시글과 댓글을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  const handleLikes = () => {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };
  const handleBookmarks = () => {
    if (!isBookmarked) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };
  // 토글 안 됨,,,
  // console.log('좋아요 상태 :', isLiked);
  // console.log('북마크 상태 :', isBookmarked);

  return (
    <>
      <AppHelmet title={`마이트립픽 | ${postData.placeName}`} />
      <h1 className="a11yHidden">게시글 상세 페이지</h1>
      <section className={S.photoBox}>
        <div role="group" className={S.onPhoto}>
          <UserProfile avatarUrl={profileImage} userName={userData.nickName} />

          {currentUserId === postData.userId ? (
            <MoreBtn onClickEdit={handleEdit} onClickDelete={handleDelete} />
          ) : (
            ''
          )}
        </div>
        <img src={postImage} alt="" />
      </section>
      <section className={S.postInfo}>
        <div role="group" className={`caption ${S.placeInfo}`}>
          <FilledMarker /> {postData.placePosition} • {postData.category}
        </div>
        <div role="group" className={S.toggleBox}>
          <ToggleBtn isToggle={isLiked} onClick={handleLikes} />
          <ToggleBtn
            bookmark
            isToggle={isBookmarked}
            onClick={handleBookmarks}
          />
        </div>
      </section>
      <PostText>{postData.contents}</PostText>
      <Comment
        postId={postId}
        currentUser={currentUserId}
        commentsList={commentsList}
        setCommentsList={setCommentsList}
      />
    </>
  );
}
