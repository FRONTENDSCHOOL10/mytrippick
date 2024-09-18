import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import S from './HomeContents.module.css';

import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import RankList from './components/RankList';
import PostList from './components/PostList';
import useHomeStore from '@/stores/useHomeStore';

function HomeContents() {
  const selectedCategory = useHomeStore((state) => state.selectedCategory);
  const setSelectedCategory = useHomeStore(
    (state) => state.setSelectedCategory
  );
  const setPage = useHomeStore((state) => state.setPage);
  const setPostCardList = useHomeStore((state) => state.setPostCardList);

  // 카테고리 리스트
  const categories = [
    '전체',
    '여행',
    '문화생활',
    '카페',
    '맛집',
    '자연',
    '액티비티',
  ];

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setPage(1);
      setPostCardList([]);
    }
  };

  return (
    <>
      {/* 로딩스피너 수정 예정 */}
      {/* {loading && <AppSpinner />} */}
      <RankList />

      {/* 카테고리 탭 */}
      {/* 스와이퍼로 수정 예정 (작은 화면에서 탭이 안넘어감) */}
      <div className={S.categoryContainer}>
        {categories.map((category) => (
          <CategoryBtn
            key={category}
            label={category}
            checked={selectedCategory === category}
            onChecked={() => handleCategoryChange(category)}
          />
        ))}
      </div>

      {/* 게시글 리스트 */}
      <PostList />
    </>
  );
}
export default HomeContents;
