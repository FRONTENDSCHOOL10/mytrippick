import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Chevron from '@/assets/svg/chevron.svg?react';
import Card from '@/components/Card/Card';
import useGlobalStore from '@/stores/useGlobalStore';
import AppSpinner from '@/components/AppSpinner/AppSpinner';
import pb from '@/api/pb';

import S from './CardList.module.css';

export default function RankList() {
  const [userIds, setUserIds] = useState([]);
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  console.log('자동배포완료');

  // 상단 인기 여행지 TOP3 (좋아요 수 기준 상위 3개)
  const rankData = useQuery({
    queryKey: ['top3'],
    queryFn: async () => {
      const result = await pb.collection('posts').getList(1, 3, {
        sort: '-likedNum',
      });
      const extractedUserIds = result.items.map((item) => item.userId);
      setUserIds(extractedUserIds);
      // console.log('추출된 userIds:', extractedUserIds);
      return result;
    },
  });
  console.log('rankData:', rankData.data);

  // top3 유저 데이터 가져오기
  const userData = useQuery({
    queryKey: ['userData', userIds],
    queryFn: async () => {
      const filter = userIds.map((id) => `id='${id}'`).join(' || ');
      const result = await pb.collection('users').getList(1, userIds.length, {
        filter: filter,
      });

      // userId 배열과 일치하는 순서로 사용자 데이터 정렬
      const sortedItems = userIds.map(
        (id) =>
          result.items.find((item) => item.id === id) || {
            id,
            name: 'Unknown User',
          }
      );

      // console.log('정렬된 유저 데이터:', sortedItems);

      return { ...result, items: sortedItems };
    },
    enabled: userIds.length > 0,
  });

  if (rankData.isLoading || userData.isLoading) {
    return <AppSpinner />;
  }

  return (
    <Swiper
      className={S.rankCardList}
      slidesPerView="auto"
      pagination={{
        clickable: false,
        el: `.${S.swiperPagination}`,
      }}
      navigation={{
        nextEl: `.${S.swiperButtonNext}`,
        prevEl: `.${S.swiperButtonPrev}`,
      }}
      modules={[Pagination, Navigation]}
    >
      {rankData.data?.items?.map((item, idx) => (
        <SwiperSlide key={idx}>
          <Card
            type="rank"
            id={item.id} // postId
            userId={item.userId}
            photo={item.photo}
            collectionId={item.collectionId}
            likedNum={item.likedNum || 0}
            placeName={item.placeName}
            placePosition={item.placePosition}
            nickName={userData.data?.items[idx]?.nickName}
            userProfile={userData.data?.items[idx]?.userProfile}
            idx={idx}
            isLiked={likedPostIds?.includes(item.id)}
            isBookmarked={bookmarkedPostIds?.includes(item.id)}
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
  );
}
