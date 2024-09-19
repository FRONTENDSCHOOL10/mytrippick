import { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useHomeStore from '@/stores/useHomeStore';
import Card from '@/components/Card/Card';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import pb from '@/api/pb';
import S from './Curation.module.css';
import useGlobalStore from '@/stores/useGlobalStore';

export default function Curation() {
  const [curationCardList, setCurationCardList] = useState([]);
  const page = useHomeStore((state) => state.page);
  const selectedCategory = useHomeStore((state) => state.selectedCategory);
  const setPage = useHomeStore((state) => state.setPage);

  // useGlobalStore의 상태를 불러오기
  const {
    isMenuOpen,
    scrollDirection,
    isLoggedIn,
    profileImage,
    nickname,
    likedPostIds,
    bookmarkedPostIds,
    toggles,
  } = useGlobalStore();

  // useEffect로 상태를 콘솔에 출력
  useEffect(() => {
    console.log('isMenuOpen:', isMenuOpen);
    console.log('scrollDirection:', scrollDirection);
    console.log('isLoggedIn:', isLoggedIn);
    console.log('profileImage:', profileImage);
    console.log('nickname:', nickname);
    console.log('likedPostIds:', likedPostIds);
    console.log('bookmarkedPostIds:', bookmarkedPostIds);
    console.log('toggles:', toggles);
  }, [
    isMenuOpen,
    scrollDirection,
    isLoggedIn,
    profileImage,
    nickname,
    likedPostIds,
    bookmarkedPostIds,
    toggles,
  ]);

  const curationData = useQuery({
    queryKey: ['curations', page, selectedCategory],
    queryFn: () =>
      fetch(
        `${pb}/api/collections/curations/records?page=${page}&perPage=8&sort=-created${
          selectedCategory === '전체'
            ? ''
            : `&filter=(category="${selectedCategory}")`
        }`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          console.log('Fetched Data:', data); // 데이터를 여기서 출력
          const newItems = data.items || [];
          setCurationCardList((prevList) =>
            page === 1 ? newItems : [...prevList, ...newItems]
          );
          return data;
        })
        .catch((error) => {
          console.error('Fetching data failed:', error); // 에러 로그 추가
        }),

    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <section className={S.curation}>
      <div className={S.curationCardList}>
        {curationCardList?.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <Card
                type="curation"
                id={item.id}
                curationId={item.id}
                photo={item.photo}
                collectionId={item.collectionId}
                likedNum={item.likedNum || 0}
                placeName={item.placeName}
                placePosition={item.placePosition}
                userId={item.userId}
              />
            </Fragment>
          );
        })}
      </div>
      {curationCardList.length > 0 &&
        curationCardList.length !== curationData.data?.totalItems && (
          <CommonBtn
            small
            onClick={() => setPage(page + 1)}
            disabled={curationData.isFetching}
          >
            더보기
          </CommonBtn>
        )}
    </section>
  );
}
