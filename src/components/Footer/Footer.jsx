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
          aria-label="GitHub Repository"
        >
          <Github className={S.githubLogo} aria-hidden="true" />
        </a>
        <p className={S.copyright}>© 2024 MyTripPick</p>
      </div>
    </footer>
  );
};

export default Footer;
