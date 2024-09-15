import AppInput from '@/components/AppInput/AppInput';
import S from './PasswordAccordion.module.css';

function PasswordAccordion() {
  return (
    <article className={S.component}>
      <h3 className="sr-only">비밀번호 변경을 위한 아코디언</h3>
      <details>
        <summary>비밀번호 변경</summary>
        <div>
          <div>
            <AppInput
              label={'새로운 비밀번호'}
              labelHidden={false}
              type="password"
              name={'newPassword'}
              placeholder={'새로운 비밀번호를 입력해주세요'}
            />
            <span></span>
          </div>
          <div>
            <AppInput
              label={'새로운 비밀번호 확인'}
              labelHidden={false}
              type="password"
              name={'newPasswordConfirm'}
              placeholder={'새로운 비밀번호를 다시 한번 입력해주세요'}
            />
            <span></span>
          </div>
        </div>
      </details>
    </article>
  );
}
export default PasswordAccordion;
