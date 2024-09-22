import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import UserProfile from '@/components/UserProfile/UserProfile';
import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import { formatTextWithBreaks } from '@/utils';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from './components/Comment/Comment';
import MoreBtn from './components/MoreBtn/MoreBtn';
import PostText from './components/PostText/PostText';
import S from './PostDetail.module.css';

export function Component() {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [commentsList, setCommentsList] = useState([]);
  const [, setError] = useState(null);

  const { initializeUser, currentUserId } = useGlobalStore();
  // 좋아요/북마크에 아래 전역 상태 변경 추가?
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const setLikedPostIds = useGlobalStore((state) => state.setLikedPostIds);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const setBookmarkedPostIds = useGlobalStore(
    (state) => state.setBookmarkedPostIds
  );

  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const navigate = useNavigate();

  const { postId } = useParams();

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
    if (likedPostIds?.includes(postId)) {
      setLikedPostIds(likedPostIds.filter((likedId) => likedId !== postId));
    } else {
      setLikedPostIds([...likedPostIds, postId]);
    }
  };
  const handleBookmarks = () => {
    if (bookmarkedPostIds?.includes(postId)) {
      setBookmarkedPostIds(
        bookmarkedPostIds.filter((bookmarkedId) => bookmarkedId !== postId)
      );
    } else {
      setBookmarkedPostIds([...bookmarkedPostIds, postId]);
    }
  };

  // 모달 '로그인' 버튼 클릭 시 로그인 페이지로 이동
  const handleLoginRedirect = () => {
    closeModal(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  // 모달 메시지
  const message = formatTextWithBreaks(
    '로그인 이후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
  );

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
          <ToggleBtn
            isToggle={likedPostIds?.includes(postId)}
            onClick={handleLikes}
          />
          <ToggleBtn
            bookmark
            isToggle={bookmarkedPostIds?.includes(postId)}
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
      {/* 모달 렌더링 */}
      {/* 홈페이지 모달 가져옴 */}
      {showModal && (
        <BasicTextModal
          type="both"
          message={message}
          fillBtnText="로그인"
          btnText="닫기"
          onFillBtnClick={handleLoginRedirect} // 로그인 페이지로 이동
          onBtnClick={closeModal} // 모달 닫기
        />
      )}
    </>
  );
}
