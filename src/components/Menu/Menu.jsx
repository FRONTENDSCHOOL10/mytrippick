import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import useModalStore from '@/stores/useModalStore';
import { useNavigate } from 'react-router-dom';
import { formatTextWithBreaks } from '@/utils';
import S from './Menu.module.css';

function Menu() {
  const { isLoggedIn, initializeUser, logout } = useGlobalStore();
  const showModal = useModalStore((state) => state.showModal); // showModal 상태 가져오기
  const openModal = useModalStore((state) => state.openModal); // openModal 함수 가져오기
  const closeModal = useModalStore((state) => state.closeModal); // closeModal 함수 가져오기
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedNickname = localStorage.getItem('nickname');

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
    if (storedNickname) {
      setNickname(storedNickname);
    }

    initializeUser();
  }, [initializeUser]);

  const handleProtectedLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openModal(); // 모달 열기
    } else {
      useGlobalStore.setState({ isMenuOpen: false });
    }
  };

  // 모달의 버튼 동작 정의
  const handleLoginRedirect = () => {
    closeModal(); // 모달 닫기
    useGlobalStore.setState({ isMenuOpen: false }); // 메뉴 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  const message = formatTextWithBreaks(
    '로그인 이후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
  );

  return (
    <>
      <div className={S.nav}>
        <header className={S.navTop}>
          {isLoggedIn ? (
            <div className={S.profileSection}>
              <img
                src={profileImage}
                alt="프로필사진"
                className={S.profileImage}
                title="프로필 사진"
              />
              <section className={S.profileDetails}>
                <p title="사용자 닉네임">{nickname}</p>
                <nav className={S.profileLinks}>
                  <NavLink
                    aria-label="마이페이지로 이동"
                    title="마이페이지로 이동"
                    to="/mypage"
                    onClick={() =>
                      useGlobalStore.setState({ isMenuOpen: false })
                    }
                  >
                    마이페이지
                  </NavLink>
                  <span role="none" className={S.divider}></span>
                  <button
                    aria-label="로그아웃 버튼"
                    title="로그아웃"
                    onClick={logout}
                  >
                    로그아웃
                  </button>
                </nav>
              </section>
            </div>
          ) : (
            <nav className={S.authLinks}>
              <NavLink
                aria-label="로그인 페이지"
                title="로그인 페이지로 이동"
                to="/login"
                className={S.authLink}
                onClick={() => useGlobalStore.setState({ isMenuOpen: false })}
              >
                로그인
              </NavLink>
              <span
                role="none"
                className={`${S.divider} ${S.beforeLoginDivider}`}
              ></span>
              <NavLink
                aria-label="회원가입 페이지"
                title="회원가입 페이지로 이동"
                to="/register"
                className={`${S.authJoin} ${S.authLink}`}
                onClick={() => useGlobalStore.setState({ isMenuOpen: false })}
              >
                회원가입
              </NavLink>
            </nav>
          )}
        </header>
        <div className={S.navLinks}>
          <ul>
            <li>
              <NavLink
                to="/ranking"
                aria-label="여행지 랭킹 보기 페이지로 이동"
                title="여행지 랭킹 보기"
                className={`headline2 ${S.linkItem}`}
                onClick={() => useGlobalStore.setState({ isMenuOpen: false })}
              >
                여행지 랭킹 보기
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/map-search"
                aria-label="내 주변 여행지 찾기 페이지로 이동"
                title="내 주변 여행지 찾기"
                className={`headline2 ${S.linkItem}`}
                onClick={() => useGlobalStore.setState({ isMenuOpen: false })}
              >
                내 주변 여행지 찾기
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/writepost"
                aria-label="게시글 등록 페이지로 이동"
                title="게시글 등록하기"
                className={`headline2 ${S.linkItem} ${
                  !isLoggedIn ? S.disabled : ''
                }`}
                onClick={(e) => handleProtectedLinkClick(e)}
              >
                게시글 등록하기
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/curation"
                aria-label="나만의 큐레이션 페이지로 이동"
                title="나만의 큐레이션"
                className={`headline2 ${S.linkItem} ${
                  !isLoggedIn ? S.disabled : ''
                }`}
                onClick={(e) => handleProtectedLinkClick(e)}
              >
                나만의 큐레이션
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* 모달 렌더링 */}
      {showModal && (
        <BasicTextModal
          type="both"
          message={message}
          fillBtnText="로그인"
          btnText="닫기"
          onFillBtnClick={handleLoginRedirect}
          onBtnClick={closeModal}
          className={S.BasicTextModal}
        />
      )}
    </>
  );
}

export default Menu;
