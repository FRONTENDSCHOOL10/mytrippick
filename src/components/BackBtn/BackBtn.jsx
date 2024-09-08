import Arrow from '@/assets/svg/arrow.svg?react';
import { useNavigate } from 'react-router-dom';
import S from './BackBtn.module.css';

const BackBtn = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        className={S.backBtn}
        onClick={goBack}
        aria-label="뒤로가기"
        title="뒤로가기"
      >
        <Arrow className={S.arrow} />
      </button>
    </>
  );
};
export default BackBtn;
