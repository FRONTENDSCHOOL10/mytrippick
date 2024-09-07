import Logo from '@/assets/svg/logo.svg?react';
import useGlobalStore from '@/stores/useGlobalStore';
import { NavLink, useLocation } from 'react-router-dom';
import BackBtn from '../BackBtn/BackBtn';
import HamburgerBtn from '../HamburgerBtn/HamburgerBtn';
import Offcanvas from '../OffCanvas/Offcanvas';
import S from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/post/');

  const scrollDirection = useGlobalStore((state) => state.scrollDirection);

  return (
    <header
      className={`${S.header} ${scrollDirection === 'down' ? S.hide : ''} `}
    >
      {isDetailPage ? (
        <BackBtn />
      ) : (
        <h1>
          <NavLink
            to="/"
            className={S.logo}
            aria-label="마이트립픽 홈"
            title="마이트립픽 홈"
          >
            <Logo aria-hidden="true" />
          </NavLink>
        </h1>
      )}

      <HamburgerBtn />
      <Offcanvas />
    </header>
  );
};
export default Header;
