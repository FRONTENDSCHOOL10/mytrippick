import S from './BasicTextModal.module.css';
import { string, func } from 'prop-types';

const BasicTextModal = ({ text, onClose }) => {
  return (
    <div className={S.modal}>
      <p className={S.text}>{text}</p>
      <button className={S.closeButton} onClick={onClose}>
        확인
      </button>
    </div>
  );
};

BasicTextModal.propTypes = {
  text: string.isRequired,
  onClose: func.isRequired,
};

export default BasicTextModal;
