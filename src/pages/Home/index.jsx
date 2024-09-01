import AppInput from '@/components/AppInput/AppInput';
import { throttle } from '@/utils';
import { useState } from 'react';

function Home() {
  const [test, setTest] = useState('');

  const handleChange = throttle((e) => {
    const value = e.target.value;
    setTest(value);
    console.log(value);
  });

  return (
    <>
      <h1>메인페이지</h1>
      <AppInput
        label={'로그인'}
        type={'password'}
        name={'아이디'}
        placeholder={'아이디를 입력해주세용'}
        defaultValue={test}
        onChange={handleChange}
      />
    </>
  );
}
export default Home;
