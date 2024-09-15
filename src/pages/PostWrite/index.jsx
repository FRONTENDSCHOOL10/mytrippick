import { useState } from 'react';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import CategoryBtnList from './components/CategoryBtnList/CategotyBtnList';
import UploadImage from './components/UploadImage/UploadImage';
import DateInput from './components/DataInput/DateInput';
import Search from '@/assets/svg/search.svg?react';
import S from './PostWrite.module.css';
import PlaceSearchModal from './components/PlaceSearchModal/PlaceSearchModal';
import usePlaceDateStore from '@/stores/usePlaceDataStore';

function PostWrite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { placeName, placeAddress, placeLatLong } = usePlaceDateStore();

  console.log(placeName, placeAddress, placeLatLong);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <CategoryBtnList />
      <AppTextArea
        label={'후기'}
        name={'behindComments'}
        small={false}
        placeholder={'후기 글을 작성해주세요'}
      />
      <CommonBtn submit={true} disabled={true} fill={true}>
        등록
      </CommonBtn>

      {isModalOpen && <PlaceSearchModal closeModal={closeModal} />}
      {/* <PlaceSearchModal closeModal={closeModal} /> */}
    </section>
  );
}
export default PostWrite;
