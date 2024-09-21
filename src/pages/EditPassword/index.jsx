import { useState, useEffect } from 'react';
import useEditPasswordStore from '@/stores/useEditPasswordStore';
import { getStorageData, testPasswordExp, throttle } from '@/utils';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import LinkBtn from '@/components/LinkBtn/LinkBtn';
import S from './EditPassword.module.css';

function EditPassword() {
  const [email, setEmail] = useState('');
  const [isTouchedPassword, setIsTouchedPassword] = useState(false);

  const {
    beforePassword,
    changePassword,
    changePasswordConfirm,
    changePasswordMessage,
    changePasswordConfirmMessage,
    isChangePassword,
    setBeforePassword,
    setChangePassword,
    setChangePasswordConfirm,
    setChangePasswordMessage,
    setChangePasswordConfirmMessage,
    setIsChangePassword,
    setIsChangePasswordConfirm,
  } = useEditPasswordStore();

  useEffect(() => {
    const getUserEmail = () => {
      const authData = getStorageData('pocketbase_auth');
      const userEmail = authData.model.email;
      setEmail(userEmail);
    };

    getUserEmail();
  }, []);

  const handleInputChange = throttle((e) => {
    const { name, value } = e.target;

    if (name === 'oldPassword') {
      setBeforePassword(value);
    }

    if (name === 'newPassword') {
      setChangePassword(value);
      setIsTouchedPassword(true);
    } else {
      setIsTouchedPassword(false);
    }

    if (name === 'newPasswordConfirm') {
      setChangePasswordConfirm(value);
    }

    checkPasswordRegExp(name, value);
  });

  const checkPasswordRegExp = (name, value) => {
    if (name === 'newPassword') {
      if (!testPasswordExp(value)) {
        setChangePasswordMessage('비밀번호 형식과 일치하지 않습니다');
        setIsChangePassword(false);
      } else {
        setChangePasswordMessage('');
        setIsChangePassword(true);
      }
    }

    if (name === 'newPasswordConfirm') {
      if (value !== changePassword) {
        setChangePasswordConfirmMessage('작성한 비밀번호와 일치하지 않습니다');
        setIsChangePasswordConfirm(false);
      } else {
        setChangePasswordConfirmMessage('');
        setIsChangePasswordConfirm(true);
      }
    }
  };

  return (
    <section className={S.component}>
      <h2 className="headline2">비밀번호 변경</h2>
      <div>
        <AppInputWithValue
          label={'이메일 주소'}
          type={'text'}
          name={'email'}
          value={email}
          isPencilOff={true}
          style={{ color: '#6E6E6E' }}
          readOnly
        />
      </div>
      <div>
        <AppInput
          label={'기존 비밀번호'}
          labelHidden={false}
          type="password"
          name={'oldPassword'}
          placeholder={'기존의 비밀번호를 입력해주세요'}
          defaultValue={beforePassword}
          onChange={handleInputChange}
          isRequired={false}
        />
      </div>
      <div>
        <AppInput
          label={'새로운 비밀번호'}
          labelHidden={false}
          type="password"
          name={'newPassword'}
          placeholder={'새 비밀번호를 입력해주세요'}
          defaultValue={changePassword}
          onChange={handleInputChange}
          isRequired={false}
        />
        <span
          className="caption"
          style={{
            color:
              isTouchedPassword && !isChangePassword ? '#ff4a4a' : '#666666',
          }}
        >
          {changePasswordMessage}
        </span>
      </div>
      <div>
        <AppInput
          label={'새로운 비밀번호 확인'}
          labelHidden={false}
          type="password"
          name={'newPasswordConfirm'}
          placeholder={'새 비밀번호를 다시 한번 입력해주세요'}
          defaultValue={changePasswordConfirm}
          onChange={handleInputChange}
          isRequired={false}
        />
        <span className="caption" style={{ color: '#ff4a4a' }}>
          {changePasswordConfirmMessage}
        </span>
      </div>
      <div className={S.btnWrapper}>
        <LinkBtn link="/mypage/edituserinfo">취소</LinkBtn>
        <CommonBtn submit={false} fill={true}>
          비밀번호 변경
        </CommonBtn>
      </div>
    </section>
  );
}
export default EditPassword;
