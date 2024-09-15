import { useId } from 'react';
import DefaultUserIcon from '@/assets/svg/default-user.svg?react';
import CameraIcon from '@/assets/svg/camera.svg?react';
import S from './ChangeUserProfilePic.module.css';

function ChangeUserProfilePic() {
  const id = useId();
  return (
    <article className={S.component}>
      <h3 className="sr-only">사용자 프로필 사진 변경 영역</h3>
      <div className={S.userProfileChoicerWrapper}>
        <label htmlFor={id} className={S.userProfileChoicer}>
          <span className={S.userProfile}>
            <DefaultUserIcon aria-label="기본 시용자 사진 아이콘" />
          </span>
          <span className={S.cameraIcons}>
            <CameraIcon aria-label="카메라 아이콘" />
          </span>
        </label>
        <input id={id} type="file" />
      </div>
    </article>
  );
}

export default ChangeUserProfilePic;
