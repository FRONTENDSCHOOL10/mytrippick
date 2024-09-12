import S from './RankContents.module.css';
import Card from '@/components/Card/Card';
import { useEffect, useState, Fragment } from 'react';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppSpinner from '@/components/AppSpinner/AppSpinner';
import PocketBase from 'pocketbase';

const RankContents = () => {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');
    const getRankList = async () => {
      setLoading(true); // 데이터 가져오는 중에 로딩 상태 활성화
      setError(null); // 새로운 요청마다 에러 상태 초기화
      try {
        const response = await pb.collection('posts').getList(page, 5, {
          sort: '-likedNum',
        });
        // console.log(response.items);
        setTotalItems(response.totalItems);
        if (page === 1) {
          setRankCardList(response.items);
        } else {
          setRankCardList((prevList) => [...prevList, ...response.items]);
        }
      } catch (error) {
        setError(`데이터를 불러오는 중 오류가 발생했습니다.`);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRankList();
  }, [page]); // page가 변경될 때마다 데이터를 다시 가져오도록 설정

  return (
    <>
      <section className={S.container}>
        {loading && <AppSpinner />}
        {error && <p className={`body1 ${S.error}`}>{error}</p>}
        <div className={S.rankCardList}>
          {rankCardList?.map((item, idx) => (
            <Fragment key={idx}>
              <Card
                type="rank"
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
        {rankCardList.length !== 0 && (
          <>
            {rankCardList.length !== totalItems ? (
              <CommonBtn
                small
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                더보기
              </CommonBtn>
            ) : null}
          </>
        )}
      </section>
    </>
  );
};

export default RankContents;
