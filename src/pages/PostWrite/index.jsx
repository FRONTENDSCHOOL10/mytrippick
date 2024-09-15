import { useState } from 'react';
import { throttle } from '@/utils';
import usePlaceDateStore from '@/stores/usePlaceDataStore';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import usePostDateStore from '@/stores/usePostDateStore';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import CategoryBtnList from './components/CategoryBtnList/CategotyBtnList';
import UploadImage from './components/UploadImage/UploadImage';
import DateInput from './components/DataInput/DateInput';
import PlaceSearchModal from './components/PlaceSearchModal/PlaceSearchModal';
import Search from '@/assets/svg/search.svg?react';
import S from './PostWrite.module.css';
import { CreateDatas } from '@/api/CreateDatas';

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

  const handleSendPostDates = (e) => {
    e.preventDefault();
  };

  return (
    <section className={S.component}>
      <UploadImage />
      <article className={S.searchPlaceBtnWrapper}>
        <h3 className="label">여행지명</h3>
        <button className={S.searchPlaceBtn} type="button" onClick={openModal}>
          {placeName === null ? '여행지를 선택해주세요' : placeName}
          <Search aria-label="돋보기 버튼 아이콘" />
        </button>
      </article>
      <DateInput />
      <CategoryBtnList onChecked={handleCheckedCategory} />
      <AppTextArea
        label={'후기'}
        name={'behindComments'}
        small={false}
        placeholder={'후기 글을 작성해주세요'}
        defaultValue={comments}
        onChange={handleCommentsChange}
      />
      <CommonBtn
        submit={true}
        disabled={false}
        fill={true}
        onClick={handleSendPostDates}
      >
        등록
      </CommonBtn>

      {isModalOpen && <PlaceSearchModal closeModal={closeModal} />}
    </section>
  );
}
export default PostWrite;
