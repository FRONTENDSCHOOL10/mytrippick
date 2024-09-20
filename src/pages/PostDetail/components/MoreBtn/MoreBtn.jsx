import Dots from '@/assets/svg/dots.svg?react';
import clsx from 'clsx';
import { bool } from 'prop-types';
import { useRef } from 'react';
import S from './MoreBtn.module.css';

MoreBtn.propTypes = {
  small: bool,
};

function MoreBtn({ small = false }) {
  const hiddenBtnRef = useRef();

  const btnClass = clsx(S.btn, {
    [S.small]: small === true,
  });

  const handleClick = () => {
    if (small) {
      hiddenBtnRef.current.classList.toggle(`${S.clickSmall}`);
    } else {
      hiddenBtnRef.current.classList.toggle(`${S.click}`);
    }
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div role="group" className={S.btnContainer}>
      <button type="button" onClick={handleClick} className={btnClass}>
        <Dots />
      </button>
      <div role="group" ref={hiddenBtnRef} className={S.hiddenBtn}>
        <button type="button" onClick={handleEdit}>
          수정하기
        </button>
        <button type="button" onClick={handleDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default MoreBtn;
