import Dots from '@/assets/svg/dots.svg?react';
import S from './MoreBtn.module.css'
import { bool } from 'prop-types';
import clsx from 'clsx';
import { useRef } from 'react';

MoreBtn.propTypes = {
  small: bool,
};

function MoreBtn({ small = false }) {
  const hiddenBtnRef = useRef();

  const btnClass = clsx(S.btn, {
    [S.small]: small === true
  });

  

  const handleClick = () => {
    console.log('클릭!');
    console.log(hiddenBtnRef.current.classList);
    
  }


  return (
    <div role='group' className={S.btnContainer}>
      <button type='button' onClick={handleClick} className={btnClass}><Dots /></button>
      <div role='group' ref={hiddenBtnRef} className={S.hiddenBtn}>
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
}

export default MoreBtn;
