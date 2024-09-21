import { useState, useEffect } from 'react';
import usePostPhotoFileStore from '@/stores/usePostPhotoFileStore';
import usePostDateStore from '@/stores/usePostDateStore';
import axios from 'axios';
import getPbImageURL from '@/api/getPbImageURL';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import DateInput from '@/components/DataInput/DateInput';
import UploadImage from '@/components/UploadImage/UploadImage';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppTextAreaWithValue from '@/components/AppTextArea/AppTextAreaWithValue';
import CategoryList from './components/CategotyList';
import S from './PostEdit.module.css';

function PostEdit() {
  const [changeCategories, setChangeCategories] = useState('');
  const [changeCommets, setChangeCommets] = useState('');

  const { image, setImageURL } = usePostPhotoFileStore();
  const { date, setDate } = usePostDateStore();

  useEffect(() => {
    const handleGetPostOriginData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_PB_API
          }/collections/posts/records/jw1whq7k6ller57`
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

  const handleChangeComments = (e) => {
    setChangeCommets(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeCategory = (newCategory) => {
    setChangeCategories(newCategory);
  };

  const handleSendChangePostDatas = (e) => {
    e.preventdefault();

    const formData = new FormData();
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
      <CommonBtn submit={false} small={false} fill={true}>
        수정
      </CommonBtn>
    </section>
  );
}
export default PostEdit;
