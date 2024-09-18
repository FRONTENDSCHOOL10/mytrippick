import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  checkCommentsMySelfLength,
  testNickNameRegExp,
  throttle,
} from '@/utils';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import PasswordAccordion from './components/PasswordAccordion/PasswordAccordion';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import ChangeUserProfilePic from './components/ChangeUserProfilePic/ChangeUserProfilePic';
import S from './EditUserInfo.module.css';
import axios from 'axios';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';

function EditUserInfo() {
  const [editUserData, setEditUserData] = useState({
    newNickName: '',
    newCommentsMySelf: '',
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    newNickNameMessage: '',
    newCommentsMySelfMessage: '',
  });

  const [, setIsChecked] = useState({
    isNewNickNameChecked: false,
    isNewCommentsChecked: false,
  });

  const { userImage } = usePostPhotoFileStore();

  useEffect(() => {
    const handleGetUserOriginData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_PB_API
          }/collections/users/records/xum3wfl4o5mhtue`
        );

        console.log(response);
        setEditUserData({
          newNickName: response.data.nickName,
          newCommentsMySelf: response.data.bio,
          email: response.data.email,
        });
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    handleGetUserOriginData();
  }, []);

  console.log(editUserData.newNickName);
  const handleInputDatas = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevDatas) => ({
      ...prevDatas,
      [name]: value,
    }));

    throttleCheckRegExp(name, value);
  };

  const throttleCheckRegExp = throttle((name, value) => {
    checkRegExp(name, value);
  });

  const checkRegExp = (name, value) => {
    let errorMessage = '';

    if (name === 'newNickName') {
      if (!testNickNameRegExp(value)) {
        errorMessage =
          '1~10자 이내의 한/영문 그리고 숫자와 특수기호 (_)만 사용 가능합니다';
      } else {
        setIsChecked((prevDatas) => ({
          ...prevDatas,
          isNewNickNameChecked: true,
        }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        newNickNameMessage: errorMessage,
      }));
    }

    if (name === 'newCommentsMySelf') {
      if (!checkCommentsMySelfLength(value)) {
        errorMessage = '30자 이하여야 해요!';
      } else {
        setIsChecked((prevDatas) => ({
          ...prevDatas,
          isNewCommentsChecked: true,
        }));
      }

      setErrorMessage((prevDatas) => ({
        ...prevDatas,
        newCommentsMySelfMessage: errorMessage,
      }));
    }
  };

  return (
    <section className={S.component}>
      <h1 className="sr-only">회원 정보 수정 페이지</h1>
      <ChangeUserProfilePic />
      <div>
        <AppInputWithValue
          label={'닉네임'}
          labelHidden={false}
          type={'text'}
          name={'newNickName'}
          value={editUserData.newNickName}
          isRequired={false}
          isPencilOff={false}
          onChange={handleInputDatas}
        />
        <span className="caption" style={{ color: '#ff4a4a' }}>
          {errorMessage.newNickNameMessage}
        </span>
      </div>
      <div>
        <AppTextArea
          label={'소개글'}
          name={'newCommentsMySelf'}
          placeholder={'소개글을 입력해주세요'}
          defaultValue={editUserData.newCommentsMySelf}
          onChange={handleInputDatas}
        />
        <span className="caption" style={{ color: '#ff4a4a' }}>
          {errorMessage.newCommentsMySelfMessage}
        </span>
      </div>
      <AppInputWithValue
        label={'이메일'}
        labelHidden={false}
        type={'email'}
        name={'userEmail'}
        value={editUserData.email}
        isRequired={false}
        isPencilOff={true}
        style={{ color: '#6E6E6E' }}
        readOnly
      />
      <PasswordAccordion />
      <div className={S.userOutBtnArea}>
        <Link to="회원탈퇴페이지이동" className={S.moveToDeleteUserPage}>
          회원탈퇴
        </Link>
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
