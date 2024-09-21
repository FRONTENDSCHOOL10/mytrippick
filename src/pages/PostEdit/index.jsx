import AppTextArea from '@/components/AppTextArea/AppTextArea';
import DateInput from '@/components/DataInput/DateInput';
import UploadImage from '@/components/UploadImage/UploadImage';
import CategoryList from './components/CategotyList';
import S from './PostEdit.module.css';
import CommonBtn from '@/components/CommonBtn/CommonBtn';

function PostEdit() {
  return (
    <section className={S.component}>
      <h2 className="headline2">게시글 수정</h2>
      <UploadImage />
      <DateInput label={'방문한 날짜 수정'} />
      <CategoryList />
      <AppTextArea
        label={'후기 수정'}
        name={'changeComment'}
        small={false}
        placeholder={'수정할 후기를 입력해주세요'}
      />
      <CommonBtn small={false} fill={true}>
        수정
      </CommonBtn>
    </section>
  );
}
export default PostEdit;
