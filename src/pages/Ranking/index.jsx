import Card from '@/components/Card/Card';
import S from './Ranking.module.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import CommonBtn from '@/components/CommonBtn/CommonBtn';

const Component = () => {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');

    const getRankList = async () => {
      setLoading(true); // 데이터 가져오는 중에 로딩 상태 활성화
      try {
        const response = await pb.collection('posts').getList(page, 10, {
          sort: '-likedNum', // likedNum을 기준으로 내림차순 정렬
        });
        setRankCardList((prevList) => [...prevList, ...response.items]); // 새로운 아이템을 목록에 추가
        setTotalItems(response.totalItems); // 전체 아이템 수 저장
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 비활성화
      }
    };
    getRankList();
  }, [page]); // page가 변경될 때마다 데이터를 다시 가져오도록 설정

  return (
    <>
      <h1 className={`headline2 ${S.sectionTitle}`}>인기 여행지 랭킹</h1>
      <section className={S.container}>
        <div className={S.rankCardList}>
          {rankCardList?.map((item, idx) => (
            <Card
              key={idx}
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
          ))}
        </div>
        {rankCardList.length !== 0 && (
          <>
            {rankCardList.length !== totalItems ? (
              <CommonBtn small onClick={() => setPage(page + 1)}>
                더보기
              </CommonBtn>
            ) : null}
          </>
        )}
      </section>
    </>
  );
};

export default Component;
