import { useId } from 'react';
import FileUpload from '@/assets/svg/add-image.svg?react';
import S from './UploadImage.module.css';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';

function UploadImage() {
  const id = useId();
  const { setImage, imageURL, setImageURL } = usePostPhotoFileStore();

  // 파일이 변경되었을 때 미리보기 이미지를 설정하는 함수
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      // 선택한 파일을 미리보기로 표시할 수 있는 URL로 변환
      const imageUrl = URL.createObjectURL(fileURL);
      setImageURL(imageUrl);
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
      <label tabIndex={0} htmlFor={id} onKeyDown={handleKeyDown}>
        {imageURL ? (
          <img
            src={imageURL}
            alt="업로드된 이미지 미리보기"
            className={S.imagePreviewURL}
          />
        ) : (
          <div className={S.imageRounded}>
            <FileUpload aria-label="파일업로드" />
          </div>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*" // 이미지 파일만 선택할 수 있도록 제한
        onChange={handleFileChange} // 파일이 변경될 때 실행
      />
    </article>
  );
}

export default UploadImage;
