import AppInput from '@/components/AppInput/AppInput';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextArea from '@/components/AppTextArea/AppTextArea';
import CategoryBtnList from './components/CategoryBtnList/CategotyBtnList';
import UploadImage from './components/UploadImage/UploadImage';
import DateInput from './components/DataInput/DateInput';
import S from './PostWrite.module.css';

function PostWrite() {
  return (
    <section className={S.component}>
      <UploadImage />
      <AppInput
        label={'여행지 명'}
        labelHidden={false}
        type={'text'}
        name={'placeName'}
        placeholder={'방문한 여행지를 입력해주세요'}
      />
      <AppInput
        label={'여행지 주소'}
        labelHidden={false}
        type={'text'}
        name={'placeAddress'}
        placeholder={'여행지 주소를 선택해주세요'}
      />
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
    </section>
  );
}
export default PostWrite;
