import Card from '@/components/Card/Card';
import S from './RankContents.module.css';
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

const RankContents = () => {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pb = new PocketBase('https://mytrippick.pockethost.io');

    const getRankList = async () => {
      setLoading(true); // 데이터 가져오는 중에 로딩 상태 활성화
      setError(null); // 새로운 요청마다 에러 상태 초기화
      try {
        const response = await pb.collection('posts').getList(page, 5, {
          sort: '-likedNum', // likedNum을 기준으로 내림차순 정렬
        });
        setRankCardList((prevList) => [...prevList, ...response.items]); // 새로운 아이템을 목록에 추가
        setTotalItems(response.totalItems); // 전체 아이템 수 저장
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
        console.error(error);
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 비활성화
      }
    };
    getRankList();
  }, [page]); // page가 변경될 때마다 데이터를 다시 가져오도록 설정

  return (
    <>
      <section className={S.container}>
        {loading && <AppSpinner />}
        {error && <p className={S.error}>{error}</p>} {/* 에러 메시지 표시 */}
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
              <CommonBtn
                small
                onClick={() => setPage(page + 1)}
                disabled={loading}
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
