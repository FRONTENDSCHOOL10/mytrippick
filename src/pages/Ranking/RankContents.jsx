import S from './RankContents.module.css';
import Card from '@/components/Card/Card';
import { useState, Fragment, useEffect } from 'react';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useGlobalStore from '@/stores/useGlobalStore';

const RankContents = () => {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [userIds, setUserIds] = useState([]);
  const API_URL = import.meta.env.VITE_PB_URL;
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);

  const rankData = useQuery({
    queryKey: ['posts', page],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/posts/records`, {
          params: { page, perPage: 5, sort: '-likedNum' },
        })
        .then((res) => {
          const newItems = res.data.items || [];
          setRankCardList((prevList) =>
            page === 1 ? newItems : [...prevList, ...newItems]
          );
          const extractedUserIds = newItems.map((item) => item.userId);
          setUserIds((prevIds) => [...prevIds, ...extractedUserIds]);
          // console.log('추출된 userIds:', extractedUserIds);

          return res.data;
        }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const userData = useQuery({
    queryKey: ['userData', userIds],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/users/records`, {
          params: {
            // 필터 문자열을 동적으로 구성
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

  useEffect(() => {
    // console.log('rankCardList:', rankCardList);
  }, [rankCardList]);

  return (
    <>
      <section className={S.container}>
        <div className={S.rankCardList}>
          {rankCardList?.map((item, idx) => (
            <Fragment key={idx}>
              <Card
                type="rank"
                id={item.id}
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
            </Fragment>
          ))}
        </div>
        {rankCardList.length > 0 &&
          rankCardList.length !== rankData.data?.totalItems && (
            <CommonBtn small onClick={() => setPage(page + 1)}>
              더보기
            </CommonBtn>
          )}
      </section>
    </>
  );
};

export default RankContents;
