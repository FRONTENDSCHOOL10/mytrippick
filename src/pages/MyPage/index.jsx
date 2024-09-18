import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import S from './MyPage.module.css';
import ProfileBox from './ProfileBox';
import useGlobalStore from '@/stores/useGlobalStore';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

function MyPage() {
  // 상태
  const [profileData, setProfileData] = useState({});
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);

  const { isLoggedIn, initializeUser, currentUserId, logout } =
    useGlobalStore();

  useEffect(() => {
    initializeUser();
  }, []);

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
  }, []);

  const noPost = postList.length === 0;

  const handleNewPost = () => {
    location.href = '/writepost'; // 게시글 작성 페이지로 이동
  };
  const handleLogout = () => {
    location.replace('/'); // 메인 페이지로 이동
    logout(); // 임시 로그아웃 처리
  };
  const handleLogin = () => {
    location.href = '/login';
  };

  if (isLoading) {
    return <AppSpinner />;
  }

  if (!isLoggedIn) {
    return <LoginModal isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
  }

  return (
    <>
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
                  <Link to={`/post/${item.id}`}>
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

export default MyPage;
