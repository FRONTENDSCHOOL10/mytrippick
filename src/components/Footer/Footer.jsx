import Github from '@/assets/svg/github.svg?react';
import Logo from '@/assets/svg/logo.svg?react';
import S from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${S.footer} container--s`}>
      <Logo className={S.footerLogo}></Logo>
      <div className={S.footerEtc}>
        <a
          className={S.githubLink}
          href="https://github.com/FRONTENDSCHOOL10/mytrippick"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="마이트립픽 깃허브 저장소"
          title="마이트립픽 깃허브 저장소"
        >
          <Github className={S.githubLogo} aria-hidden="true" />
        </a>
        <p className={S.copyright}>&copy; 2024 MYTRIPPICK</p>
      </div>
    </footer>
  );
};

export default Footer;
