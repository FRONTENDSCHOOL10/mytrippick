import CommonBtn from '../CommonBtn/CommonBtn';
import { string, func, oneOf } from 'prop-types';
import S from './BasicTextModal.module.css';

const BasicTextModal = ({
  message,
  fillBtnText,
  btnText,
  type,
  onFillBtnClick,
  onBtnClick,
}) => {
  // 모달 바깥 영역 클릭 시 닫힘
  const handleOverlayClick = () => {
    if (onBtnClick) {
      onBtnClick(); // onBtnClick이 전달된 경우 호출
    }
  };

  // 모달 내부 클릭 핸들러 - 이벤트 버블링 방지
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={S.overlay} onClick={handleOverlayClick}>
      <div className={S.modal} onClick={handleModalClick}>
        <p
          className={`title2 ${S.message}`}
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className={S.btnContainer}>
          {type === 'fill' && (
            <CommonBtn small fill onClick={onFillBtnClick}>
              {fillBtnText}
            </CommonBtn>
          )}
          {type === 'default' && (
            <CommonBtn small onClick={onBtnClick}>
              {btnText}
            </CommonBtn>
          )}
          {type === 'both' && (
            <>
              <CommonBtn small fill onClick={onFillBtnClick}>
                {fillBtnText}
              </CommonBtn>
              <CommonBtn small onClick={onBtnClick}>
                {btnText}
              </CommonBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

BasicTextModal.propTypes = {
  message: string.isRequired,
  fillBtnText: string,
  btnText: string,
  type: oneOf(['fill', 'default', 'both']).isRequired,
  onBtnClick: func,
  onFillBtnClick: func,
};

export default BasicTextModal;
