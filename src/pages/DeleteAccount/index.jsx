import pb from '@/api/pb';
import Notice from '@/assets/svg/notice.svg?react';
import AppInput from '@/components/AppInput/AppInput';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './DeleteAccount.module.css';

function DeleteAccount() {
  const [passwordInput, setPasswordInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const showModal = useModalStore((state) => state.showModal); // showModal 상태 가져오기
  const openModal = useModalStore((state) => state.openModal); // openModal 함수 가져오기
  const closeModal = useModalStore((state) => state.closeModal); // closeModal 함수 가져오기

  const { initializeUser, currentUserId } = useGlobalStore();

  const navigate = useNavigate();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (currentUserId) {
        try {
          const user = await pb.collection('users').getOne(currentUserId);
          setUserEmail(user.email);
        } catch (error) {
          console.error('Failed to fetch user email:', error);
        }
      }
    };

    fetchUserEmail();
  }, [currentUserId]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordInput(value);
    setIsDisabled(value.trim().length === 0);
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  const handleConfirm = async () => {
    try {
      // PocketBase의 authWithPassword 메서드를 사용하여 인증 시도
      await pb.collection('users').authWithPassword(userEmail, passwordInput);
      // 인증 성공
      // 회원 정보 삭제 및 모든 포스트/댓글 삭제
      // 탈퇴 완료 모달
      setModalMessage('탈퇴가 완료되었습니다.');
      setIsDeleted(true);
      openModal();
    } catch (error) {
      // 인증 실패
      setModalMessage('비밀번호가 일치하지 않습니다.');
      openModal();
      console.error('비밀번호 확인 실패:', error);
    }
  };

  const handleClose = () => {
    if (isDeleted) {
      return navigate('/');
    } else {
      return closeModal();
    }
  };

  return (
    <>
      <h1 className="a11yHidden">회원 탈퇴 페이지</h1>
      <h2 className={`headline2 ${S.heading}`}>회원 탈퇴</h2>
      <div role="group" className={S.flexContainer}>
        <section className={S.inputContainer}>
          <AppInputWithValue
            type="text"
            name="email"
            label="이메일 주소"
            labelHidden={false}
            placeholder={userEmail}
            isPencilOff
            readOnly
            disabled
            className="userEmail"
          />
          <AppInput
            type="password"
            name="password"
            label="비밀번호"
            labelHidden={false}
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePasswordChange}
          />
          <div role="group" className={S.notice}>
            <Notice />
            <span className="label">유의사항</span>
          </div>
          <p className="caption">
            &nbsp;&nbsp;•&nbsp;&nbsp;회원 탈퇴 시 모든 데이터와 정보가
            삭제됩니다.
          </p>
        </section>
        <section className={S.btnContainer}>
          <CommonBtn onClick={handleCancel}>취소</CommonBtn>
          <CommonBtn fill onClick={handleConfirm} disabled={isDisabled}>
            확인
          </CommonBtn>
        </section>
      </div>
      {/* 모달 렌더링 */}
      {showModal && (
        <BasicTextModal
          type="default"
          message={modalMessage}
          btnText="닫기"
          onBtnClick={handleClose}
        />
      )}
    </>
  );
}

export default DeleteAccount;
