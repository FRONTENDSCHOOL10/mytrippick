import Dots from '@/assets/svg/dots.svg?react';
import clsx from 'clsx';
import { bool } from 'prop-types';
import { useRef } from 'react';
import S from './MoreBtn.module.css';
import { func } from 'prop-types';

MoreBtn.propTypes = {
  small: bool,
  onClickEdit: func,
  onClickDelete: func,
};

function MoreBtn({ small = false, onClickEdit, onClickDelete }) {
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

  return (
    <div role="group" className={S.btnContainer}>
      <button type="button" onClick={handleClick} className={btnClass}>
        <Dots />
      </button>
      <div role="group" ref={hiddenBtnRef} className={S.hiddenBtn}>
        <button type="button" onClick={onClickEdit}>
          수정하기
        </button>
        <button type="button" onClick={onClickDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default MoreBtn;
