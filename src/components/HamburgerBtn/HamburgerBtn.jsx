import useGlobalStore from '@/stores/useGlobalStore';
import S from './HamburgerBtn.module.css';

const HamburgerBtn = () => {
  const isMenuOpen = useGlobalStore((state) => state.isMenuOpen);

  const handleClick = () => {
    useGlobalStore.setState({ isMenuOpen: !isMenuOpen });
  };

  return (
    <button
      className={`${S.btn} ${isMenuOpen ? S.active : ''}`}
    onClick={handleClick}
      aria-haspopup="true"
      aria-expanded={isMenuOpen ? 'true' : 'false'}
      aria-controls="offcanvasMenu"
      aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
      title={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
    >
      <span role='none' className={S.line}></span>
      <span role='none' className={S.line}></span>
    </button>
  );
};

export default HamburgerBtn;
