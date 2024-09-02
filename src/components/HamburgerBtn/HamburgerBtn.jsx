import useGlobalStore from '@/stores/useGlobalStore';
import { useRef } from 'react';
import S from './HamburgerBtn.module.css';

const HamburgerBtn = () => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);
  const target = useRef();

  const handleClick = () => {
    useGlobalStore.setState({ isMenuOpen: !isMenuOpen });
  };

  return (
    <button
      className={`${S.btn} ${isMenuOpen ? S.active : ''}`}
      ref={target}
      onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={isMenuOpen ? 'true' : 'false'}
      aria-controls="offcanvasMenu"
      aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
    >
      <div className={S.line}></div>
      <div className={S.line}></div>
    </button>
  );
};

export default HamburgerBtn;
