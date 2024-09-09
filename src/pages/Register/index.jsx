import { useState } from 'react';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './Register.module.css';
import {
  testEmailRegExp,
  testNickNameRegExp,
  testPasswordExp,
  throttle,
} from '@/utils';

function Register() {
  const [formDatas, setFormDatas] = useState({
    email: '',
    password: '',
    checkPassword: '',
    nickName: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    emailMessage: '',
    passwordMessage:
      '숫자, 특수문자를 최소 1가지 이상 포함한 대소문자 구분 없는 영문 8~15자',
    passwordCheckMessage: '',
    nickNameMessage:
      '1~12자 이내의 한/영문 그리고 숫자와 특수기호 (_) 포함 가능',
  });

  const [isChecked, setIsChecked] = useState({
    isEmailChecked: false,
    isPasswordChecked: false,
    isConfirmPasswordChecked: false,
    isNickNameChecked: false,
  });

  const [isTouched, setIsTouched] = useState({
    password: false,
    nickName: false,
  });

  const handleFormDatasChange = throttle((e) => {
    const { name, value } = e.target;

    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setFormDatas((prevDatas) => ({
      ...prevDatas,
      [name]: value,
    }));

    checkRegExp(name, value);
  });

  const checkRegExp = (name, value) => {
    let errorMessage = '';

    if (name === 'email') {
      if (!testEmailRegExp(value)) {
        errorMessage = '이메일 주소가 맞나요?';
      } else {
        setIsChecked((prevDatas) => ({ ...prevDatas, isEmailChecked: true }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        emailMessage: errorMessage,
      }));
    }

    if (name === 'password') {
      if (!testPasswordExp(value)) {
        errorMessage = '비밀번호 형식에 일치하지 않습니다';
      } else {
        setIsChecked((prevDatas) => ({
          ...prevDatas,
          isPasswordChecked: true,
        }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        passwordMessage: errorMessage,
      }));
    }

    if (name === 'checkPassword') {
      if (formDatas.password !== value) {
        errorMessage = '비밀번호가 일치하지 않습니다';
      } else {
        setIsChecked((prevDatas) => ({
          ...prevDatas,
          isConfirmPasswordChecked: true,
        }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        passwordCheckMessage: errorMessage,
      }));
    }

    if (name === 'nickName') {
      if (!testNickNameRegExp(value)) {
        errorMessage = '사용할 수 없는 닉네임입니다';
      } else {
        setIsChecked((prevDatas) => ({
          ...prevDatas,
          isNickNameChecked: true,
        }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        nickNameMessage: errorMessage,
      }));
    }
  };

  const isFormValid =
    isChecked.isEmailChecked &&
    isChecked.isPasswordChecked &&
    isChecked.isConfirmPasswordChecked &&
    isChecked.isNickNameChecked;

  return (
    <section className={S.component}>
      <h1 className="headline1">회원가입</h1>
      <form action="">
        <article className="inputContainer">
          <AppInput
            label={'이메일 주소'}
            labelHidden={false}
            type={'email'}
            name={'email'}
            placeholder={'ID@example.com'}
            defaultValue={formDatas.email}
            onChange={handleFormDatasChange}
            className={S.errors}
          />
          <span
            style={{
              color:
                isTouched.email && !isChecked.isEmailChecked ? '#ff4a4a' : '',
            }}
            className="caption"
          >
            {errorMessage.emailMessage}
          </span>
        </article>

        <article className="inputContainer">
          <AppInput
            label={'비밀번호'}
            labelHidden={false}
            type={'password'}
            name={'password'}
            placeholder={'비밀번호를 입력해주세요.'}
            defaultValue={formDatas.password}
            onChange={handleFormDatasChange}
          />
          <span
            style={{
              color:
                isTouched.password && !isChecked.isPasswordChecked
                  ? '#ff4a4a'
                  : '',
            }}
            className="caption"
          >
            {errorMessage.passwordMessage}
          </span>
        </article>

        <article className="inputContainer">
          <AppInput
            label={'비밀번호 확인'}
            labelHidden={false}
            type={'password'}
            name={'checkPassword'}
            placeholder={'비밀번호를 한번 더 입력해주세요.'}
            defaultValue={formDatas.confirmPassWord}
            onChange={handleFormDatasChange}
          />
          <span
            style={{
              color: !isChecked.isConfirmPasswordChecked ? '#ff4a4a' : '',
            }}
            className="caption"
          >
            {errorMessage.passwordCheckMessage}
          </span>
        </article>

        <article className="inputContainer">
          <AppInput
            label={'닉네임'}
            labelHidden={false}
            type={'text'}
            name={'nickName'}
            placeholder={'닉네임을 입력해주세요.'}
            defaultValue={formDatas.nickName}
            onChange={handleFormDatasChange}
          />
          <span style={{ color: '#ff4a4a' }} className="caption">
            {errorMessage.nickNameMessage}
          </span>
        </article>

        <CommonBtn
          submit={true}
          disabled={!isFormValid}
          small={false}
          fill={true}
        >
          가입하기
        </CommonBtn>
      </form>
    </section>
  );
}

export default Register;
