import { useState } from 'react';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './Login.module.css';
import { throttle } from '@/utils';

function Login() {
  const [formDatas, setFormDatas] = useState(() => {
    return {
      email: '',
      password: '',
      confirmPassWord: '',
      nickName: '',
    };
  });

  const handleFormDatasChange = throttle((e) => {
    const targets = e.target.value;
    console.log(targets);
  });

  return (
    <section className={S.component}>
      <h1 className="headline1">로그인</h1>
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
          />
          <span className="caption"></span>
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
          <span className="caption">
            영문, 숫자, 특수문자 중 2가지 조합 8~15자
          </span>
        </article>

        <CommonBtn submit={true} disabled={true} small={false} fill={true}>
          로그인
        </CommonBtn>
      </form>
    </section>
  );
}

export default Login;
