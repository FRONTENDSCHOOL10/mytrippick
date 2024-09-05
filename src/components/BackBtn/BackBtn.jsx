import Arrow from '@/assets/svg/arrow.svg?react';
import S from './BackBtn.module.css';

const BackBtn = () => {
  return (
    <>
      <button className={S.backBtn}>
        <Arrow className={S.arrow} />
      </button>
    </>
  );
};
export default BackBtn;
