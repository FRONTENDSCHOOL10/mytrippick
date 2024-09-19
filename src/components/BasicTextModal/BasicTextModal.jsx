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
  return (
    <div className={S.modal}>
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
