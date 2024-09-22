import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  checkCommentsMySelfLength,
  getStorageData,
  testNickNameRegExp,
  throttle,
} from '@/utils';
import useModalStore from '@/stores/useModalStore';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pb';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import LinkBtn from '@/components/LinkBtn/LinkBtn';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import ChangeUserProfilePic from './components/ChangeUserProfilePic/ChangeUserProfilePic';
import AppInputWithValue from '@/components/AppInput/AppInputWithValue';
import S from './EditUserInfo.module.css';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';

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

  const [isEditUserDataOkay, setIsEditUserDataOkay] = useState(false);
  const { showModal, setShowModal, closeModal } = useModalStore();

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
        alert(`${error}와 같은 이유로 데이터를 받아오는데 실패하였습니다!`);
      }
    };

    handleGetUserOriginData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditUserDataOkay) {
      setShowModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditUserDataOkay]);

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

    try {
      await pb.collection('users').update(userID, userEditData);
      setIsEditUserDataOkay(true);
    } catch (error) {
      alert(`${error}와 같은 문제로 수정 데이터 전송에 실패했습니다`);
    }
  };

  const handleModalBtnClick = () => {
    closeModal();
    navigation('/mypage');
  };

  return (
    <section className={S.component}>
      <h1 className="sr-only">회원 정보 수정 페이지</h1>
      <AppHelmet title={'회원 정보 수정'} />
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
      <LinkBtn link={'/mypage/edituserinfo/editpassword'}>
        비밀번호 변경
      </LinkBtn>
      <div className={S.userOutBtnArea}>
        <LinkBtn link={'/mypage/deleteaccount'} small={true}>
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

      {showModal && (
        <BasicTextModal
          message={'회원 정보 수정에 성공하셨습니다✨'}
          fillBtnText={'확인'}
          type={'fill'}
          onFillBtnClick={handleModalBtnClick}
        />
      )}
    </section>
  );
}

export default EditUserInfo;
