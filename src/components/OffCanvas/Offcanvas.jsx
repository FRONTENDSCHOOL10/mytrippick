import useGlobalStore from '@/stores/useGlobalStore';
import Menu from '../Menu/Menu';
import S from './Offcanvas.module.css';

const Offcanvas = () => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      useGlobalStore.setState({ isMenuOpen: false });
    }
  };

  return (
    <div className={S.offcanvas}>
      <nav
        className={S.inner}
        role="dialog"
        aria-labelledby="offcanvasLabel"
        aria-modal={isMenuOpen ? 'true' : 'false'}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <Menu />
      </nav>
    </div>
  );
};

export default Offcanvas;
