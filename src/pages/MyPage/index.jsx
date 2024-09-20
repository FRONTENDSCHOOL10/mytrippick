import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import AppSpinner from '@/components/AppSpinner/AppSpinner';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import ProfileBox from './components/ProfileBox';
import S from './MyPage.module.css';

export function Component() {
  // 상태
  const [profileData, setProfileData] = useState({});
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);

  const { isLoggedIn, initializeUser, currentUserId, logout } =
    useGlobalStore();
  const closeModal = useModalStore((state) => state.closeModal);

  const navigate = useNavigate();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 가져오기
        const record = await pb.collection('users').getOne(currentUserId);
        setProfileData(record);

        const currentUserPosts = await pb.collection('posts').getList(1, 50, {
          filter: `userId = "${currentUserId}"`,
          sort: '-created',
        });
        setPostList(currentUserPosts.items);
        setIsLoading(false);
      } catch (error) {
        // 에러 처리
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const noPost = postList.length === 0;

  const handleNewPost = () => {
    navigate('/writepost'); // 게시글 작성 페이지로 이동
  };
  const handleLogout = () => {
    navigate('/'); // 메인 페이지로 이동
    logout(); // 로그아웃 처리
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleClose = () => {
    closeModal();
    navigate('/');
  };

  if (isLoading) {
    return <AppSpinner />;
  }

  if (!isLoggedIn) {
    return (
      <BasicTextModal
        message="로그인이 필요한 페이지입니다."
        type="both"
        fillBtnText="로그인"
        btnText="닫기"
        onFillBtnClick={handleLogin}
        onBtnClick={handleClose}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>마이트립픽 | 마이페이지</title>
        <meta
          name="description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:title" content="마이트립픽" />
        <meta property="og:type" content="site" />
        <meta
          property="og:description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:site:author" content="리액트에서-구해조" />
      </Helmet>
      <h1 className="a11yHidden">마이페이지</h1>
      <ProfileBox userData={profileData} />
      <section>
        <h2 className={`headline4 ${S.visitedPlace}`}>내가 방문한 여행지</h2>
        {noPost ? (
          <div className={S.noPost}>
            <p className="body2">
              아직 여행지 기록이 없네요. <br />
              멋진 여행을 다녀오셨다면, 첫 기록을 남겨보세요!
            </p>
            <CommonBtn small onClick={handleNewPost}>
              여행 기록 작성하러 가기
            </CommonBtn>
            {/* 클릭 시 게시글 작성 페이지로 이동 */}
          </div>
        ) : (
          <ul className={S.postContainer}>
            {postList.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={`/posts/${item.id}`}>
                    {/* 링크는 각 게시글 상세페이지로 연결되도록 추후 수정 */}
                    <img
                      src={getPbImageURL(item)}
                      alt={item.placeName}
                      title={item.placeName}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <section className={S.logout}>
        <CommonBtn small onClick={handleLogout}>
          로그아웃
        </CommonBtn>
        {/* 로그아웃 후 메인페이지로 이동하도록? */}
      </section>
    </>
  );
}
