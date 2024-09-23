import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Chevron from '@/assets/svg/chevron.svg?react';
import Card from '@/components/Card/Card';
import axios from 'axios';
import useGlobalStore from '@/stores/useGlobalStore';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

import S from './CardList.module.css';

export default function RankList() {
  const [userIds, setUserIds] = useState([]);
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const API_URL = import.meta.env.VITE_PB_URL;
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  // 상단 인기 여행지 TOP3 (좋아요 수 기준 상위 3개)
  const rankData = useQuery({
    queryKey: ['top3'],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/posts/records`, {
          params: { page: 1, perPage: 3, sort: '-likedNum' },
        })
        .then((res) => {
          // console.log('rankData:', res);

          const items = res.data.items || [];
          const extractedUserIds = items.map((item) => item.userId);
          setUserIds(extractedUserIds);
          // console.log("추출된 userIds:", extractedUserIds);
          return res.data; // 원본 데이터를 그대로 반환
        }),
  });

  // top3 유저 데이터 가져오기
  const userData = useQuery({
    queryKey: ['userData', userIds],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/users/records`, {
          params: {
            // Construct the filter string dynamically
            filter: userIds.map((id) => `id='${id}'`).join(' || '),
          },
        })
        .then((res) => {
          const items = res.data.items || [];

          // userId 배열과 일치하는 순서로 사용자 데이터 정렬
          const sortedItems = userIds.map(
            (id) =>
              items.find((item) => item.id === id) || {
                id,
                name: 'Unknown User',
              }
          );

          //   console.log("정렬된 유저 데이터:", sortedItems);
          return { ...res.data, items: sortedItems };
        }),
    enabled: userIds.length > 0,
  });

  if (rankData.isPending || userData.isPending) {
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
