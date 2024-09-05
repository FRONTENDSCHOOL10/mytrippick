import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useGlobalStore from '@/stores/useGlobalStore';
import S from './Menu.module.css';

function Menu() {
  const { isLoggedIn, profileImage, nickname, initializeUser, logout } =
    useGlobalStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const handleProtectedLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={S.nav}>
      <header className={S.navTop}>
        {isLoggedIn ? (
          <div className={S.profileSection}>
            <img
              src={profileImage}
              alt="프로필사진"
              className={S.profileImage}
            />
            <section className={S.profileDetails}>
              <p>{nickname}</p>
              <nav aria-label="User menu">
                <NavLink aria-label="My Page" to="/mypage">
                  마이페이지
                </NavLink>
                <button aria-label="Logout" onClick={logout}>
                  로그아웃
                </button>
              </nav>
            </section>
          </div>
        ) : (
          <nav className={S.authLinks}>
            <NavLink
              aria-label="로그인 페이지"
              to="/login"
              className={S.authLink}
            >
              로그인
            </NavLink>
            <NavLink
              aria-label="회원가입 페이지"
              to="/register"
              className={S.authLink}
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
              to="/전체랭킹"
              aria-label="전체 랭킹 보기 페이지로 이동"
              className={S.linkItem}
            >
              전체 랭킹 보기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/내주변"
              aria-label="내 주변 여행지 찾기 페이지로 이동"
              className={S.linkItem}
            >
              내 주변 여행지 찾기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/등록"
              aria-label="게시글 등록 페이지로 이동"
              className={`${S.linkItem} ${!isLoggedIn ? S.disabled : ''}`}
              onClick={handleProtectedLinkClick}
            >
              게시글 등록하기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/나만의큐레이션"
              aria-label="나만의 큐레이션 페이지로 이동"
              className={`${S.linkItem} ${!isLoggedIn ? S.disabled : ''}`}
              onClick={handleProtectedLinkClick}
            >
              나만의 큐레이션
            </NavLink>
          </li>
        </ul>
      </div>

      {showModal && (
        <div className={S.modalOverlay}>
          <div className={S.modalContent}>
            <p>로그인 후 이용 가능합니다</p>
            <div className={S.closeOption}>
              <nav className={S.loginLink}>
                <NavLink
                  aria-label="로그인 페이지"
                  to="/login"
                  className={S.authLink}
                >
                  로그인 하러 가기
                </NavLink>
              </nav>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
