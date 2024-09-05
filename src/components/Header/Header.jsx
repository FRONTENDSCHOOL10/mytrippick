import Logo from '@/assets/svg/logo.svg?react';
import { NavLink } from 'react-router-dom';
import HamburgerBtn from '../HamburgerBtn/HamburgerBtn';
import Offcanvas from '../OffCanvas/Offcanvas';
import S from './Header.module.css';


const Header = () => {
  return (
    <header className={S.header}>
      <h1>
        <NavLink to="/" className={S.logo} aria-label="마이트립픽 홈">
          <Logo aria-hidden="true" />
        </NavLink>
      </h1>
      <HamburgerBtn />
      <Offcanvas />
    </header>
  );
};
export default Header;
