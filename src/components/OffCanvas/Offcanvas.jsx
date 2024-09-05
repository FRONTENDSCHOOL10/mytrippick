import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useRef } from 'react';
import Menu from '../Menu/Menu';
import S from './Offcanvas.module.css';

const Offcanvas = () => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);
  const setIsFocusTrapped = useGlobalStore((state) => state.setIsFocusTrapped);
  const menuRef = useRef();

  useEffect(() => {
    if (isMenuOpen) {
      menuRef.current.focus();
      setIsFocusTrapped(true);
    } else {
      setIsFocusTrapped(false);
    }
  }, [isMenuOpen, setIsFocusTrapped]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      useGlobalStore.setState({ isMenuOpen: false });
    }
  };

  return (
    <div
      id="offcanvasMenu"
      ref={menuRef}
      className={`${S.offcanvas} ${isMenuOpen ? S.open : ''}`}
      role="dialog"
      aria-labelledby="offcanvasLabel"
      aria-modal={isMenuOpen ? 'true' : 'false'}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <Menu />
    </div>
  );
};

export default Offcanvas;
