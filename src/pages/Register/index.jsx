import { useState } from 'react';
import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './Register.module.css';
import { throttle } from '@/utils';

function Register() {
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
          <span className="caption"></span>
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
        </article>

        <CommonBtn submit={true} disabled={true} small={false} fill={true}>
          가입하기
        </CommonBtn>
      </form>
    </section>
  );
}

export default Register;
