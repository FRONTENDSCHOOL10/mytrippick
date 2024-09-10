import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import S from './Home.module.css';
import Card from '@/components/Card/Card';
import { Helmet } from 'react-helmet-async';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import Chevron from '@/assets/svg/chevron.svg?react';
import { useState, useEffect } from 'react';
import { useLoadMore } from '@/hooks/useLoadMore';
import { fetchPosts } from '@/api/postApi';

function Home() {
  const [postCardList, setPostCardList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortedTop3Posts, setSortedTop3Posts] = useState([]);

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

  // 게시글 목록 가져오기
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPostCardList(posts);
      } catch (error) {
        console.error('게시글 로드 실패:', error);
      }
    };

    loadPosts();
  }, []);

  // 좋아요 수를 기준으로 게시글 정렬
  useEffect(() => {
    const sortedPosts = [...postCardList].sort(
      (a, b) => b.likedNum - a.likedNum
    );
    setSortedTop3Posts(sortedPosts.slice(0, 3)); // 상위 3개의 게시글만 추출
  }, [postCardList]);

  // 선택된 카테고리에 따른 필터링된 리스트
  const filteredCardList =
    selectedCategory === '전체'
      ? postCardList
      : postCardList.filter((item) => item.category === selectedCategory);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCards(10); // 카테고리 변경 시 초기 노출 개수 10개로 리셋
  };

  // 더보기 버튼 클릭 시 카드 10개씩 추가
  const { visibleCount, handleShowMore } = useLoadMore(10, 10);

  return (
    <>
      <Helmet>
        <title>마이트립픽</title>
        <meta
          name="description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:title" content="마이트리픽" />
        <meta property="og:type" content="site" />
        <meta
          property="og:description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:site:author" content="리액트에서-구해조" />
      </Helmet>
      {/* 인기 여행지 TOP 3 */}
      <h1 className={`headline4 ${S.sectionTitle}`}>인기 여행지 TOP 3</h1>
      <Swiper
        className={S.rankList}
        slidesPerView="auto"
        pagination={{
          clickable: true,
          el: `.${S.swiperPagination}`,
        }}
        navigation={{
          nextEl: `.${S.swiperButtonNext}`,
          prevEl: `.${S.swiperButtonPrev}`,
        }}
        modules={[Pagination, Navigation]}
      >
        {sortedTop3Posts.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Card
              type="rank"
              postId={item.id}
              thumbnailImg={item.photo} // 필드 이름 확인
              userId={item.userId} // userId 추가
              likedNum={item.likedNum}
              title={item.placeName} // 필드 이름 확인
              location={item.placePosition} // 필드 이름 확인
            />
          </SwiperSlide>
        ))}
        {/* 페이지네이션 */}
        <div className={S.swiperPagination}></div>
        {/* 내비게이션 */}
        <button
          className={S.swiperButtonPrev}
          tabIndex={0}
          aria-label="이전"
          title="이전"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // 스페이스바가 스크롤을 발생시키지 않게 함
              document.querySelector(`.${S.swiperButtonPrev}`).click();
            }
          }}
        >
          <Chevron />
        </button>
        <button
          className={S.swiperButtonNext}
          tabIndex={0}
          aria-label="다음"
          title="다음"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.querySelector(`.${S.swiperButtonNext}`).click();
            }
          }}
        >
          <Chevron />
        </button>
      </Swiper>

      {/* 카테고리 탭 */}
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
      <section className={S.post}>
        <div className={S.postCardList}>
          {filteredCardList.slice(0, visibleCards).map((item, idx) => (
            <Card
              type="post"
              className={S.card}
              key={idx}
              postId={item.id}
              thumbnailImg={item.photo}
              title={item.placeName}
              location={item.placePosition}
              likedNum={item.likedNum}
              userId={item.userId}
            />
          ))}
        </div>
        {visibleCount < filteredCardList.length && (
          <CommonBtn
            small
            onClick={() => handleShowMore(filteredCardList.length)}
          >
            더보기
          </CommonBtn>
        )}
      </section>
    </>
  );
}
export default Home;
