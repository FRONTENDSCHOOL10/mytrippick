import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import useHomeStore from '@/stores/useHomeStore';
import S from './CategoryTab.module.css';

function CategoryTab() {
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
    <div className={S.categoryContainer}>
      <Swiper slidesPerView="auto" className={S.categoryWrapper}>
        {categories.map((category) => (
          <SwiperSlide key={category} className={S.categorySlide}>
            <CategoryBtn
              key={category}
              label={category}
              checked={selectedCategory === category}
              onChecked={() => handleCategoryChange(category)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoryTab;
