import { useState } from 'react';
import useEditPasswordStore from '@/stores/useEditPasswordStore';
import { testPasswordExp, throttle } from '@/utils';
import AppInput from '@/components/AppInput/AppInput';
import ChevronIcon from '@/assets/svg/chevron.svg?react';
import S from './PasswordAccordion.module.css';

function PasswordAccordion() {
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
    <article className={S.component}>
      <h3 className="sr-only">비밀번호 변경을 위한 아코디언</h3>
      <details>
        <summary>
          <ChevronIcon className={S.chevronIcon} />
          비밀번호 변경
        </summary>

        <div className={S.passwordInputWrapper}>
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
              placeholder={'새로운 비밀번호를 입력해주세요'}
              defaultValue={changePassword}
              onChange={handleInputChange}
              isRequired={false}
            />
            <span
              className="caption"
              style={{
                color:
                  isTouchedPassword && !isChangePassword
                    ? '#ff4a4a'
                    : '#666666',
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
              placeholder={'새로운 비밀번호를 다시 한번 입력해주세요'}
              defaultValue={changePasswordConfirm}
              onChange={handleInputChange}
              isRequired={false}
            />
            <span className="caption" style={{ color: '#ff4a4a' }}>
              {changePasswordConfirmMessage}
            </span>
          </div>
        </div>
      </details>
    </article>
  );
}
export default PasswordAccordion;
