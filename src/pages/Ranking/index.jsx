import Card from '@/components/Card/Card';
import S from './Ranking.module.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import CommonBtn from '@/components/CommonBtn/CommonBtn';

const Ranking = () => {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems] = useState(null);

  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');
    const getRankList = async () => {
      const response = await pb.collection('posts').getList(page, 10, {
        sort: '-likedNum', // likedNum을 기준으로 내림차순 정렬
      });
      // console.log(response);
      setRankCardList(response.items);
    };
    getRankList();
  }, []);

  const handleMorePosts = () => {
    setPage(1);
  };

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

export default Ranking;
