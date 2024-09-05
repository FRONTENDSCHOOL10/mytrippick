import { string } from 'prop-types';
import S from './UserProfile.module.css';

UserProfile.propTypes = {
  avatarUrl: string,
  userName: string,
};

function UserProfile({ avatarUrl, userName }) {
  const altText = `${userName} 프로필`;

  return (
    <section className={S.user}>
      <img src={avatarUrl} alt={altText} />
      <p>{userName}</p>
    </section>
  );
}

export default UserProfile;
