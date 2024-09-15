import { useId } from 'react';
import CameraIcon from '@/assets/svg/camera.svg?react';

function ChangeUserProfilePic() {
  const id = useId();
  return (
    <article>
      <h3 className="sr-only">사용자 프로필 사진 변경 영역</h3>
      <div>
        <label htmlFor={id}>
          <span>s</span>
          <span>
            <CameraIcon aria-label="카메라 아이콘" />
          </span>
        </label>
      </div>
      <input id={id} type="file" />
    </article>
  );
}

export default ChangeUserProfilePic;
