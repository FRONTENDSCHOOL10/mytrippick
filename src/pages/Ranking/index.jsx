import useGlobalStore from '@/stores/useGlobalStore';
import useModalStore from '@/stores/useModalStore';
import Card from '@/components/Card/Card';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import AppSpinner from '@/components/AppSpinner/AppSpinner';
import { useState, useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatTextWithBreaks } from '@/utils';
import S from './Ranking.module.css';
import axios from 'axios';

const MAX_POSTS = 15;
const PER_PAGE = 5;

export function Component() {
  const [userIds, setUserIds] = useState([]);
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_PB_URL;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axios.get(
          `${API_URL}/api/collections/posts/records`,
          {
            params: { page: pageParam, perPage: PER_PAGE, sort: '-likedNum' },
          }
        );
        const newItems = res.data.items || [];
        setUserIds((prevIds) => [
          ...new Set([...prevIds, ...newItems.map((item) => item.userId)]),
        ]);
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        const loadedPostsCount =
          allPages?.flatMap((page) => page.items).length || 0;
        if (
          loadedPostsCount >= MAX_POSTS ||
          loadedPostsCount >= (lastPage?.totalItems || 0)
        ) {
          return undefined;
        }
        return allPages.length + 1;
      },
      refetchOnWindowFocus: false,
    });

  const userData = useInfiniteQuery({
    queryKey: ['userData', userIds],
    queryFn: async () => {
      if (userIds.length === 0) return { items: [] }; // 빈 데이터를 반환해 오류 방지
      const res = await axios.get(`${API_URL}/api/collections/users/records`, {
        params: {
          filter: userIds.map((id) => `id='${id}'`).join(' || '),
        },
      });
      return res.data;
    },
    enabled: userIds.length > 0,
    getNextPageParam: () => undefined,
    refetchOnWindowFocus: false,
  });

  const handleLoginRedirect = () => {
    closeModal();
    navigate('/login');
  };

  const message = formatTextWithBreaks(
    '로그인 이후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
  );

  const loadMoreRef = useRef(null);

  const handleLoadMore = useCallback(
    (e) => {
      e.preventDefault();
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (isLoading) {
    return <AppSpinner />;
  }

  // 방어적 코드: data.pages가 존재하지 않을 때 빈 배열 반환
  const posts = data?.pages?.flatMap((page) => page.items) || [];
  const users = userData?.data?.pages?.flatMap((page) => page.items) || [];

  return (
    <>
      <h1 className={`headline2 ${S.sectionTitle}`}>인기 여행지 랭킹</h1>
      <section className={S.container}>
        <div className={S.rankCardList}>
          {posts.slice(0, MAX_POSTS).map((item, idx) => {
            const user = users.find((user) => user.id === item.userId) || {
              name: 'Unknown User',
            };
            return (
              <Card
                key={item.id}
                type="rank"
                id={item.id}
                userId={item.userId}
                photo={item.photo}
                collectionId={item.collectionId}
                likedNum={item.likedNum || 0}
                placeName={item.placeName}
                placePosition={item.placePosition}
                nickName={user.nickName}
                userProfile={user.userProfile}
                idx={idx}
                isLiked={likedPostIds?.includes(item.id)}
                isBookmarked={bookmarkedPostIds?.includes(item.id)}
              />
            );
          })}
        </div>
        {hasNextPage && posts.length < MAX_POSTS && (
          <CommonBtn
            small
            onClick={handleLoadMore}
            ref={loadMoreRef}
            disabled={isFetchingNextPage}
          >
            더보기
          </CommonBtn>
        )}
      </section>

      {showModal && (
        <BasicTextModal
          type="both"
          message={message}
          fillBtnText="로그인"
          btnText="닫기"
          onFillBtnClick={handleLoginRedirect}
          onBtnClick={closeModal}
        />
      )}
    </>
  );
}
