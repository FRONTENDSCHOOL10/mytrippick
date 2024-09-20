import pb from '@/api/pb';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import AppInput from '@/components/AppInput/AppInput';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './ConfirmPassword.module.css';

function ConfirmPassword() {
  const [passwordInput, setPasswordInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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
      navigate('/mypage/edituserinfo');
    } catch (error) {
      // 인증 실패
      openModal();
      console.error('비밀번호 확인 실패:', error);
    }
  };

  return (
    <>
      <AppHelmet title="마이트립픽 | 비밀번호 확인" />
      <h1 className="a11yHidden">비밀번호 확인 페이지</h1>
      <h2 className={`headline2 ${S.heading}`}>비밀번호 확인</h2>
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
          message="비밀번호가 일치하지 않습니다."
          btnText="닫기"
          onBtnClick={closeModal}
        />
      )}
    </>
  );
}

export default ConfirmPassword;
