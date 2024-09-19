import { Link } from 'react-router-dom';
import S from './LinkButton.module.css';

function LinkButton() {
  return (
    <div className={S.component}>
      <Link to="회원탈퇴페이지이동" className={S.moveToDeleteUserPage}>
        회원탈퇴
      </Link>
    </div>
  );
}

export default LinkButton;
