import { useId } from 'react';
import DefaultUserIcon from '@/assets/svg/default-user.svg?react';
import CameraIcon from '@/assets/svg/camera.svg?react';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import S from './ChangeUserProfilePic.module.css';

function ChangeUserProfilePic() {
  const id = useId();
  const { setUserImage, userImageURL, setUserImageURL } =
    usePostPhotoFileStore();

  // 파일이 변경되었을 때 미리보기 이미지를 설정하는 함수
  const handleUserProFileChange = (e) => {
    setUserImage(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      // 선택한 파일을 미리보기로 표시할 수 있는 URL로 변환
      const imageUrl = URL.createObjectURL(fileURL);
      setUserImageURL(imageUrl);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // 스페이스바의 기본 동작(스크롤)을 막음
      document.getElementById(id).click();
    }
  };

  return (
    <article className={S.component}>
      <h3 className="sr-only">사용자 프로필 사진 변경 영역</h3>
      <div className={S.userProfileChoicerWrapper}>
        <label
          htmlFor={id}
          className={S.userProfileChoicer}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {userImageURL ? (
            <>
              <span className={S.userProfile}>
                <img
                  src={userImageURL}
                  alt="유저가 올린 프로필 사진 미리보기"
                  className={S.userImagePreviewURL}
                />
              </span>
              <span className={S.cameraIcons}>
                <CameraIcon aria-label="카메라 아이콘" />
              </span>
            </>
          ) : (
            <>
              <span className={S.userProfile}>
                <DefaultUserIcon aria-label="기본 시용자 사진 아이콘" />
              </span>
              <span className={S.cameraIcons}>
                <CameraIcon aria-label="카메라 아이콘" />
              </span>
            </>
          )}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleUserProFileChange}
        />
      </div>
    </article>
  );
}

export default ChangeUserProfilePic;
