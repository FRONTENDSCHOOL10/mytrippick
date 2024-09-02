import AppInput from '@/components/AppInput/AppInput';
import { throttle } from '@/utils';
import { useState } from 'react';

function Home() {
  const [values, setValues] = useState('');

  const handleChange = throttle((e) => {
    setValues(e.target.value);
    console.log(e.target.value);
  });

  return (
    <main>
      <h1>메인페이지</h1>
      <AppInput
        label={'아이디'}
        labelHidden={false}
        type={'password'}
        name={'아이디'}
        defaultValue={values}
        placeholder={'아이디 입력'}
        onChange={handleChange}
      />
    </main>
  );
}
export default Home;
