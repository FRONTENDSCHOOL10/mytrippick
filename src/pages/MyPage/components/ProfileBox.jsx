import getPbImageURL from '@/api/getPbImageURL';
import Settings from '@/assets/svg/settings.svg?react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import S from './ProfileBox.module.css';

ProfileBox.propTypes = {
  userData: PropTypes.shape({
    nickName: string,
    bio: string,
  }),
};

function ProfileBox({ userData }) {
  const profileImage = getPbImageURL(userData, 'userProfile');

  return (
    <>
      <section className={S.profileContainer}>
        <div className={S.profile} role="group">
          <img src={profileImage} alt="닉네임 프로필" />
          <div className={S.profileText} role="group">
            <h2 className="headline4">{userData.nickName}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
        <Link
          to="/mypage/edituserinfo"
          aria-label="회원 정보 수정"
          title="회원 정보 수정"
        >
          {/* 회원 정보 수정 페이지로 이동 */}
          <Settings />
        </Link>
      </section>
    </>
  );
}

export default ProfileBox;
