import S from './Modal.module.css';
import { string, func } from 'prop-types';

const Modal = ({ text, onClose }) => {
  return (
    <div className={S.modal}>
      <p className={S.text}>{text}</p>
      <button className={S.closeButton} onClick={onClose}>
        확인
      </button>
    </div>
  );
};

Modal.propTypes = {
  text: string.isRequired,
  onClose: func.isRequired,
};

export default Modal;
