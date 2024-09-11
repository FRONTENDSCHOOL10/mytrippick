import { bool, func } from 'prop-types';
import { useEffect, useRef } from 'react';
import S from './LoginModal.module.css';

LoginModal.propTypes = {
  isLoggedIn: bool,
  onLogin: func,
};

function LoginModal({ isLoggedIn, onLogin }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    onLogin();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog ref={dialogRef} className={S.dialog}>
      <h2>로그인 후 이용 가능합니다.</h2>
      <div>
        <button onClick={handleLogin}>로그인하러 가기</button>
      </div>
    </dialog>
  );
}

export default LoginModal;
