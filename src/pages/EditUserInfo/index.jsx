import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  checkCommentsMySelfLength,
  getStorageData,
  testNickNameRegExp,
  throttle,
} from '@/utils';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import useEditPasswordStore from '@/stores/useEditPasswordStore';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import useGlobalStore from '@/stores/useGlobalStore';
import PasswordAccordion from './components/PasswordAccordion/PasswordAccordion';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import ChangeUserProfilePic from './components/ChangeUserProfilePic/ChangeUserProfilePic';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import S from './EditUserInfo.module.css';
import LinkBtn from '@/components/LinkBtn/LinkBtn';

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

  const { beforePassword, changePassword, changePasswordConfirm } =
    useEditPasswordStore();

  const { logout } = useGlobalStore();

  useEffect(() => {
    const handleGetUserOriginData = async () => {
      const authData = getStorageData('pocketbase_auth');
      const userId = authData.model.id;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PB_API}/collections/users/records/${userId}`
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

  const handleDeleteBeforeData = (e) => {
    const button = e.target.closest('button');

    if (button) {
      const inputElement = button.previousElementSibling;
      if (inputElement.name === 'newNickName') {
        setEditUserData((prevState) => ({
          ...prevState,
          newNickName: '',
        }));
      } else if (inputElement.name === 'newCommentsMySelf') {
        setEditUserData((prevState) => ({
          ...prevState,
          newCommentsMySelf: '',
        }));
      }
    } else {
      console.log('버튼을 찾을 수 없습니다.');
    }
  };

  const navigation = useNavigate();

  const handleSendEditUserInfo = async (e) => {
    e.preventDefault();

    const authData = await getStorageData('pocketbase_auth');
    const userID = authData.model.id;

    const userEditData = {
      nickName: editUserData.newNickName,
      bio: editUserData.newCommentsMySelf,
    };

    if (userImage) {
      userEditData.userProfile = userImage;
    }

    if (changePassword) {
      userEditData.password = changePassword;
      userEditData.passwordConfirm = changePasswordConfirm;
      userEditData.oldPassword = beforePassword;

      try {
        const editing = await pb
          .collection('users')
          .update(userID, userEditData);
        alert('비밀번호 변경에 성공하셨습니다');
        logout();
        navigation('/login');
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const editing = await pb
        .collection('users')
        .update('xum3wfl4o5mhtue', userEditData);
      alert('회원정보가 수정되었습니다');
      navigation('/mypage');
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
          onClick={handleDeleteBeforeData}
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
          onClick={handleDeleteBeforeData}
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
        <LinkBtn link={'회원탈퇴페이지'} small={true}>
          회원탈퇴
        </LinkBtn>
      </div>
      <div className={S.btnContainer}>
        <LinkBtn link={'/mypage'}>취소</LinkBtn>
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
