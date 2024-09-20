import pb from '@/api/pb';
import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import Card from '@/components/Card/Card';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import AppSpinner from '@/components/AppSpinner/AppSpinner';
import { useState, Fragment, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatTextWithBreaks } from '@/utils';
import { throttle } from '@/utils';
import S from './Ranking.module.css';

export function Component() {
  const [rankCardList, setRankCardList] = useState([]);
  const [page, setPage] = useState(1);
  const [userIds, setUserIds] = useState([]);
  // const API_URL = import.meta.env.VITE_PB_URL;
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const navigate = useNavigate();

  // 쓰로틀된 페이지 증가 함수
  const throttledIncreasePage = throttle(() => {
    setPage((prevPage) => prevPage + 1);
  }, 1000);

  const fetchRankData = useCallback((page, signal) => {
    return pb
      .collection('posts')
      .getList(page, 5, { sort: '-likedNum' }, { signal })
      .then((res) => {
        const newItems = res.items || [];
        setRankCardList((prevList) =>
          page === 1 ? newItems : [...prevList, ...newItems]
        );
        const extractedUserIds = newItems.map((item) => item.userId);
        setUserIds((prevIds) => [...prevIds, ...extractedUserIds]);
        return res;
      });
  }, []);

  const fetchUserData = useCallback((userIds, signal) => {
    return pb
      .collection('users')
      .getFullList(200, {
        filter: userIds.map((id) => `id='${id}'`).join(' || '),
        signal,
      })
      .then((res) => {
        const items = res || [];
        const sortedItems = userIds.map(
          (id) =>
            items.find((item) => item.id === id) || { id, name: 'Unknown User' }
        );
        return { items: sortedItems };
      });
  }, []);

  const rankData = useQuery({
    queryKey: ['posts', page],
    queryFn: ({ signal }) => fetchRankData(page, signal),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const userData = useQuery({
    queryKey: ['userData', userIds],
    queryFn: ({ signal }) => fetchUserData(userIds, signal),
    enabled: userIds.length > 0,
  });

  // 모달 onFillBtn 버튼 클릭 시 로그인 페이지로 이동
  const handleLoginRedirect = () => {
    closeModal(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  // 모달 메시지
  const message = formatTextWithBreaks(
    '로그인 이후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
  );

  if (
    rankData.isLoading ||
    userData.isLoading ||
    !rankData.data ||
    !userData.data
  ) {
    return <AppSpinner />;
  }

  return (
    <>
      <h1 className={`headline2 ${S.sectionTitle}`}>인기 여행지 랭킹</h1>
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
            <CommonBtn small onClick={throttledIncreasePage}>
              더보기
            </CommonBtn>
          )}
      </section>

      {/* 모달 렌더링 */}
      {showModal && (
        <BasicTextModal
          type="both"
          message={message}
          fillBtnText="로그인"
          btnText="닫기"
          onFillBtnClick={handleLoginRedirect} // 로그인 페이지로 이동
          onBtnClick={closeModal} // 모달 닫기
        />
      )}
    </>
  );
}
