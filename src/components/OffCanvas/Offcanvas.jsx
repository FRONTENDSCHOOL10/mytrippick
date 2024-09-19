import useGlobalStore from '@/stores/useGlobalStore';
import Menu from '../Menu/Menu';
import { useEffect } from 'react';
import S from './Offcanvas.module.css';

const Offcanvas = () => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      useGlobalStore.setState({ isMenuOpen: false });
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className={S.offcanvas}>
      <nav
        className={S.inner}
        role="dialog"
        aria-labelledby="offcanvasLabel"
        aria-modal={isMenuOpen ? 'true' : 'false'}
        tabIndex={-1}
      >
        <Menu />
      </nav>
    </div>
  );
};

export default Offcanvas;
