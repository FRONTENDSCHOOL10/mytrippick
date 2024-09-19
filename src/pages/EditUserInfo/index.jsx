import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  checkCommentsMySelfLength,
  testNickNameRegExp,
  throttle,
} from '@/utils';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import useEditPasswordStore from '@/stores/useEditPasswordStore';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import PasswordAccordion from './components/PasswordAccordion/PasswordAccordion';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import ChangeUserProfilePic from './components/ChangeUserProfilePic/ChangeUserProfilePic';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import S from './EditUserInfo.module.css';

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

  const { userImage, setUserImageURL } = usePostPhotoFileStore();

  const { changePassword, changePasswordConfirm } = useEditPasswordStore();

  useEffect(() => {
    const handleGetUserOriginData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_PB_API
          }/collections/users/records/xum3wfl4o5mhtue`
        );

        setEditUserData({
          newNickName: response.data.nickName,
          newCommentsMySelf: response.data.bio,
          email: response.data.email,
        });

        if (response.data.userProfile !== '') {
          setUserImageURL(getPbImageURL(response.data, 'userProfile'));
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    handleGetUserOriginData();
  }, []);

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

  const handleSendEditUserInfo = async (e) => {
    e.preventDefault();

    const userEditData = {
      password: changePassword,
      passwordConfirm: changePasswordConfirm,
      oldPassword: oldpassword,
      nickName: editUserData.newNickName,
      bio: editUserData.newCommentsMySelf,
      userProfile: userImage,
    };

    if (changePassword) {
      userEditData.password = changePassword;
      userEditData.passwordConfirm = changePasswordConfirm;
      userEditData.oldPassword = oldPassword;
    }

    try {
      const editing = await pb
        .collection('users')
        .update('xum3wfl4o5mhtue', data);
    } catch (error) {
      console.log(error);
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
          isPencilOff={false}
          onChange={handleInputDatas}
        />
        <span className="caption" style={{ color: '#ff4a4a' }}>
          {errorMessage.newNickNameMessage}
        </span>
      </div>
      <div>
        <AppInputWithValue
          label={'소개글'}
          labelHidden={false}
          type={'text'}
          name={'newCommentsMySelf'}
          value={editUserData.newCommentsMySelf}
          isPencilOff={false}
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
        <CommonBtn
          submit={true}
          className={S.confirm}
          fill={true}
          onClick={handleSendEditUserInfo}
        >
          확인
        </CommonBtn>
      </div>
    </section>
  );
}

export default EditUserInfo;
