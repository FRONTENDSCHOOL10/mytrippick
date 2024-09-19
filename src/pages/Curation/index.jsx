import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useHomeStore from '@/stores/useHomeStore';
import Card from '@/components/Card/Card';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import pb from '@/api/pb';
import S from './Curation.module.css';

export default function Curation() {
  const [curationCardList, setCurationCardList] = useState([]);
  const page = useHomeStore((state) => state.page);
  const selectedCategory = useHomeStore((state) => state.selectedCategory);
  const setPage = useHomeStore((state) => state.setPage);

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
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched Data:', data); // 데이터를 여기서 출력
          const newItems = data.items || [];
          setCurationCardList((prevList) =>
            page === 1 ? newItems : [...prevList, ...newItems]
          );
          return data; // 원본 데이터를 그대로 반환
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