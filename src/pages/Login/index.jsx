import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './Login.module.css';
import { testEmailRegExp, testPasswordExp, throttle } from '@/utils';
import { submitLogin } from '@/api/submitLogin';
import useGlobalStore from '@/stores/useGlobalStore';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';

function Login() {
  const [formDatas, setFormDatas] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useGlobalStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn,
  }));

  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn]);

  const handleFormDatasChange = throttle((e) => {
    const { name, value } = e.target;

    setFormDatas((prevDatas) => {
      const newDatas = {
        ...prevDatas,
        [name]: value,
      };

      validateField(name, value, newDatas);
      return newDatas;
    });
  }, 300);

  const validateField = (name, value, newDatas) => {
    let error = '';

    if (name === 'email') {
      if (!testEmailRegExp(value)) {
        error = '이메일 주소가 맞나요?';
      }
    } else if (name === 'password') {
      if (!testPasswordExp(value)) {
        error = '영문, 숫자, 특수문자 중 2가지 조합 8~15자';
        setIsPasswordValid(false);
      } else {
        setIsPasswordValid(true);
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsFormValid(
      testEmailRegExp(newDatas.email) && testPasswordExp(newDatas.password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: formDatas.email,
      password: formDatas.password,
    };

    try {
      await submitLogin('users', userData);
      setIsLoggedIn(true);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '비밀번호가 틀렸습니다.',
      }));
      setIsPasswordValid(false);
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigation('/');
  };

  return (
    <section className={S.component}>
      <h1 className="headline1">로그인</h1>
      <form onSubmit={handleSubmit}>
        <article className="inputContainer">
          <AppInput
            label={'이메일 주소'}
            labelHidden={false}
            type={'email'}
            name={'email'}
            placeholder={'ID@example.com'}
            defaultValue={formDatas.email}
            onChange={handleFormDatasChange}
            className={errors.email ? S.inputError : ''}
          />
          <span
            style={{
              color: errors.email ? '#ff4a4a' : '',
            }}
            className="caption"
          >
            {errors.email}
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
            onKeyDown={handleKeyDown}
            className={errors.password ? S.inputError : ''}
          />
          <span
            style={{
              color: errors.password ? '#ff4a4a' : '',
            }}
            className="caption"
          >
            {errors.password}
          </span>
        </article>

        <CommonBtn
          submit={true}
          disabled={!isFormValid}
          small={false}
          fill={true}
          onClick={handleSubmit}
        >
          로그인
        </CommonBtn>
      </form>

      {showModal && (
        <BasicTextModal
          message="환영합니다"
          type="default"
          btnText="확인"
          onBtnClick={handleCloseModal}
        />
      )}
    </section>
  );
}

export default Login;
