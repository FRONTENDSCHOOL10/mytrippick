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
import { useState, useEffect, Fragment } from 'react';
import PocketBase from 'pocketbase';

function Home() {
  const [rankCardList, setRankCardList] = useState([]);
  const [postCardList, setPostCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

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

  // 상단 인기 여행지 TOP3 (좋아요 수 기준 상위 3개)
  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');
    const getRankList = async () => {
      const response = await pb.collection('posts').getList(1, 3, {
        sort: '-likedNum', // likedNum을 기준으로 내림차순 정렬
      });
      // console.log(response);
      setRankCardList(response.items);
    };
    getRankList();
  }, []);

  // 카테고리 변경 시
  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');
    // console.log(selectedCategory);

    const getPostList = async () => {
      const response = await pb.collection('posts').getList(page, 4, {
        sort: '-likedNum', // likedNum을 기준으로 내림차순 정렬
        filter:
          selectedCategory === '전체' ? '' : `category="${selectedCategory}"`,
      });
      // console.log(response.items);
      setTotalItems(response.totalItems);
      if (page === 1) {
        setPostCardList(response.items);
      } else {
        setPostCardList([...postCardList, ...response.items]);
      }
    };
    getPostList();
  }, [selectedCategory, page]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPostCardList([]);
    setPage(1);
  };

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
      {/* <ToggleBtn /> */}
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
        {rankCardList?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Card
              type="rank"
              id={item.id}
              postId={item.id}
              userId={item.userId}
              photo={item.photo}
              collectionId={item.collectionId}
              likedNum={item.likedNum || 0}
              placeName={item.placeName}
              placePosition={item.placePosition}
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
          {postCardList?.map((item, idx) => (
            <Fragment key={idx}>
              <Card
                type="post"
                // className={S.card}
                id={item.id}
                photo={item.photo}
                collectionId={item.collectionId}
                likedNum={item.likedNum || 0}
                placeName={item.placeName}
                placePosition={item.placePosition}
                userId={item.userId}
              />
            </Fragment>
          ))}
        </div>
        {postCardList.length !== 0 && (
          <>
            {postCardList.length !== totalItems ? (
              <CommonBtn small onClick={() => setPage(page + 1)}>
                더보기
              </CommonBtn>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
export default Home;
