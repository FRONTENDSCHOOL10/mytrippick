import { Fragment, useState, useEffect } from 'react';
import Card from '@/components/Card/Card';
import pb from '@/api/pb';
import S from './Curation.module.css';

function Curation() {
  const [bookmarkCardList, setBookmarkCardList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState([]);

  const loggedInUserId = pb.authStore.model?.id;

  if (!loggedInUserId) {
    console.error('로그인된 사용자의 이메일을 가져오지 못했습니다.');
    return null;
  }

  const fetchBookmarkedPostIds = async () => {
    setIsFetchingMore(true);
    try {
      const bookmarkResponse = await pb.collection('bookmarks').getFullList({
        filter: `userId="${loggedInUserId}"`,
      });

      const bookmarkedPostIds = bookmarkResponse.map(
        (bookmark) => bookmark.postId
      );
      setBookmarkedPostIds(bookmarkedPostIds);

      console.log(bookmarkedPostIds);
      if (bookmarkedPostIds.length > 0) {
        const postResponse = await pb.collection('posts').getList(1, 10, {
          filter: `id in (${bookmarkedPostIds.slice(0, 10).join(',')})`,
        });

        setBookmarkCardList(postResponse.items);
      }
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
    setIsFetchingMore(false);
  };

  useEffect(() => {
    fetchBookmarkedPostIds();
  }, [loggedInUserId]);

  const handleLoadMore = async () => {
    const nextPostIds = bookmarkedPostIds.slice(
      visibleCount,
      visibleCount + 10
    );

    if (nextPostIds.length > 0) {
      setIsFetchingMore(true);
      try {
        const postResponse = await pb
          .collection('posts')
          .getList(1, nextPostIds.length, {
            filter: `id in (${nextPostIds.map((id) => `"${id}"`).join(',')})`,
          });

        setBookmarkCardList((prev) => [...prev, ...postResponse.items]);
        setVisibleCount((prevCount) => prevCount + 10);
      } catch (error) {
        console.error('추가 데이터를 가져오는 중 오류 발생:', error);
      }
      setIsFetchingMore(false);
    }
  };

  return (
    <section className={S.curation}>
      <div className={S.curationCardList}>
        {bookmarkCardList.map((item, idx) => (
          <Fragment key={idx}>
            <Card
              type="post"
              id={item.id}
              postId={item.id}
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
      {bookmarkedPostIds && visibleCount < bookmarkedPostIds.length && (
        <button onClick={handleLoadMore} disabled={isFetchingMore}>
          {isFetchingMore ? '로딩 중...' : '더보기'}
        </button>
      )}
    </section>
  );
}

export default Curation;
