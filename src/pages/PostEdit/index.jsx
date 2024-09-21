import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import pb from '@/api/pb';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import usePostDateStore from '@/stores/usePostDateStore';
import useModalStore from '@/stores/useModalStore';
import getPbImageURL from '@/api/getPbImageURL';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import DateInput from '@/components/DataInput/DateInput';
import UploadImage from '@/components/UploadImage/UploadImage';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextAreaWithValue from '@/components/AppTextArea/AppTextAreaWithValue';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import CategoryList from './components/CategotyList';
import S from './PostEdit.module.css';

function PostEdit() {
  const [changeCategories, setChangeCategories] = useState('');
  const [changeCommets, setChangeCommets] = useState('');

  const { image, setImageURL } = usePostPhotoFileStore();
  const { date, setDate } = usePostDateStore();

  const [isChangePostOkay, setIsChangePostOkay] = useState(false);
  const { showModal, setShowModal, closeModal } = useModalStore();

  const { postId } = useParams();

  useEffect(() => {
    const handleGetPostOriginData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PB_API}/collections/posts/records/${postId}`
        );

        setChangeCategories(response.data.category);
        setChangeCommets(response.data.contents);
        const visitedDate = new Date(response.data.visitedDate);
        if (!isNaN(visitedDate)) {
          setDate(visitedDate);
        } else {
          console.error('Invalid date:', response.data.visitedDate);
        }

        if (response.data.photo !== '') {
          setImageURL(getPbImageURL(response.data, 'photo'));
        }
      } catch (error) {
        alert(`${error}와 같은 문제로 데이터 받아오는데 실패하였습니다`);
      }
    };

    handleGetPostOriginData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isChangePostOkay) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChangePostOkay]);

  const handleChangeComments = (e) => {
    setChangeCommets(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeCategory = (newCategory) => {
    setChangeCategories(newCategory);
  };

  const navigation = useNavigate();

  const handleSendChangePostDatas = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 시간이 맞지 않아 DB에 저장되는 날짜가 달라지는 문제 해결을 위한 코드
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    formData.append('visitedDate', adjustedDate.toISOString().split('T')[0]);
    formData.append('category', changeCategories);
    formData.append('contents', changeCommets);
    if (image) {
      formData.append('photo', image);
    }

    try {
      await pb.collection('posts').update(postId, formData);
      setIsChangePostOkay(true);
      setImageURL('');
      setDate('');
    } catch (err) {
      alert(`${err}과 같은 문제로 인해 게시물 수정에 실패하였습니다`);
    }
  };

  const handleModalBtnClick = () => {
    closeModal();
    navigation(`/posts/${postId}`);
  };

  return (
    <section className={S.component}>
      <AppHelmet title="게시글 수정" />
      <h2 className="headline2">게시글 수정</h2>
      <UploadImage />
      <DateInput label={'방문한 날짜 수정'} />
      <CategoryList
        selectedCategory={changeCategories}
        onCategoryChange={handleChangeCategory}
      />
      <AppTextAreaWithValue
        label={'후기 수정'}
        name={'changeComment'}
        small={false}
        placeholder={'수정할 후기를 입력해주세요'}
        value={changeCommets}
        onChange={handleChangeComments}
      />
      <CommonBtn
        submit={false}
        small={false}
        fill={true}
        onClick={handleSendChangePostDatas}
      >
        수정
      </CommonBtn>
      {showModal && (
        <BasicTextModal
          message={'게시글 수정을 완료하였습니다✨'}
          fillBtnText={'확인'}
          type={'fill'}
          onFillBtnClick={handleModalBtnClick}
        />
      )}
    </section>
  );
}
export default PostEdit;
