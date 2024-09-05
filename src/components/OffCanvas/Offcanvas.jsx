import useGlobalStore from '@/stores/useGlobalStore';
import { useEffect, useRef } from 'react';
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
      <ul>
        <li tabIndex="0">Menu Item 1</li>
        <li tabIndex="0">Menu Item 2</li>
        <li tabIndex="0">Menu Item 3</li>
        <li tabIndex="0">Menu Item 4</li>
      </ul>
    </div>
  );
};

export default Offcanvas;
