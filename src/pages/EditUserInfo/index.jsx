import AppInput from '@/components/AppInput/AppInput';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import PasswordAccordion from './components/PasswordAccordion/PasswordAccordion';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import ChangeUserProfilePic from './components/ChangeUserProfilePic/ChangeUserProfilePic';
import S from './EditUserInfo.module.css';

function EditUserInfo() {
  return (
    <section className={S.component}>
      <h1 className="sr-only">회원 정보 수정 페이지</h1>
      <ChangeUserProfilePic />
      <div>
        <AppInput
          label={'닉네임'}
          labelHidden={false}
          type={'text'}
          name={'changeNickName'}
          placeholder={'변경할 닉네임을 입력해주세요'}
          isRequired={false}
        />
        <span></span>
      </div>
      <div>
        <AppTextArea
          label={'소개글'}
          name={'changeCommentMySelf'}
          placeholder={'소개글을 입력해주세요'}
        />
        <span></span>
      </div>
      <AppInput
        label={'이메일 주소'}
        labelHidden={false}
        type={'email'}
        name={'email'}
        placeholder={'이메일을 입력해주세요'}
        isRequired={false}
      />
      <PasswordAccordion />
      <div className={S.userOutBtnArea}>
        <CommonBtn small={true}>회원탈퇴</CommonBtn>
      </div>
      <div className={S.btnContainer}>
        <CommonBtn className={S.cancle}>취소</CommonBtn>
        <CommonBtn className={S.confirm} fill={true}>
          확인
        </CommonBtn>
      </div>
    </section>
  );
}

export default EditUserInfo;
