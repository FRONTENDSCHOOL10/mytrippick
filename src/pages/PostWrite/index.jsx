import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData, throttle } from '@/utils';
import { CreateDatas } from '@/api/CreateDatas';
import usePlaceDateStore from '@/stores/usePlaceDataStore';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import usePostDateStore from '@/stores/usePostDateStore';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import CategoryBtnList from './components/CategoryBtnList/CategotyBtnList';
import UploadImage from '@/components/UploadImage/UploadImage';
import DateInput from '@/components/DataInput/DateInput';
import PlaceSearchModal from './components/PlaceSearchModal/PlaceSearchModal';
import Search from '@/assets/svg/search.svg?react';
import S from './PostWrite.module.css';

function PostWrite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [category, setCategory] = useState('');
  const { placeName, placeAddress, placeLatLong } = usePlaceDateStore();
  const { image } = usePostPhotoFileStore();
  const { date } = usePostDateStore();

  const handleCommentsChange = throttle((e) => {
    setComments(e.target.value);
  });

  const handleCheckedCategory = (value) => {
    setCategory(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUserId = async () => {
    const authData = await getStorageData('pocketbase_auth');
    return authData.model.id;
  };

  const navitation = useNavigate();

  const handleSendPostDates = async (e) => {
    e.preventDefault();

    try {
      const userId = await getUserId();

      const formData = new FormData();

      formData.append('placeName', placeName);
      formData.append('placePosition', placeAddress);
      formData.append('placeLatLong', JSON.stringify(placeLatLong));
      formData.append('category', category);
      formData.append('visitedDate', date.toISOString());
      formData.append('contents', comments);
      formData.append('userId', userId);

      if (image) {
        formData.append('photo', image);
      }

      CreateDatas('posts', formData);
      alert('게시글이 등록되었습니다!!🎉');
      navitation('/');
    } catch (error) {
      console.log(error);
      alert('게시물을 보내는 도중 에러가 발생했습니다!');
    }
  };

  const isButtonDisable =
    placeName && image && comments && category && date ? false : true;

  return (
    <section className={S.component}>
      <AppHelmet title={'게시글 등록'} />
      <UploadImage />
      <article className={S.searchPlaceBtnWrapper}>
        <h3 className="label">여행지명</h3>
        <button className={S.searchPlaceBtn} type="button" onClick={openModal}>
          {placeName === null ? '여행지를 선택해주세요' : placeName}
          <Search aria-label="돋보기 버튼 아이콘" />
        </button>
      </article>
      {isModalOpen && <PlaceSearchModal closeModal={closeModal} />}
      <DateInput />
      <CategoryBtnList onChecked={handleCheckedCategory} />
      <div>
        <AppTextArea
          label={'후기'}
          name={'behindComments'}
          small={false}
          placeholder={'후기 글을 작성해주세요'}
          defaultValue={comments}
          onChange={handleCommentsChange}
        />
        {comments === '' ? (
          <span className="caption" style={{ color: '#6e6e6e' }}>
            후기는 한글자 이상 작성해주세요!!
          </span>
        ) : (
          <></>
        )}
      </div>
      <CommonBtn
        submit={true}
        disabled={isButtonDisable}
        fill={true}
        onClick={handleSendPostDates}
      >
        등록
      </CommonBtn>
    </section>
  );
}
export default PostWrite;
